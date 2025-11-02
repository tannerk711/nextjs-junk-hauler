import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';

// Validation schema
const estimateRequestSchema = z.object({
  photos: z.array(z.object({
    url: z.string().url().max(500),
    publicId: z.string().max(200).optional(),
    thumbnail: z.string().url().max(500).optional(),
  })).min(1).max(10),
  notes: z.string().max(500).optional(),
});

// Helper function to convert image URL to base64 with SSRF protection
async function urlToBase64(url: string): Promise<{ base64: string; mediaType: string }> {
  // SECURITY: Validate URL is from allowed domain (Cloudinary only)
  const allowedDomain = 'res.cloudinary.com';
  let urlObj: URL;

  try {
    urlObj = new URL(url);
  } catch (err) {
    throw new Error('Invalid URL format');
  }

  if (!urlObj.hostname.endsWith(allowedDomain)) {
    throw new Error('Invalid image source - must be from Cloudinary');
  }

  // SECURITY: Prevent redirects to internal services
  const response = await fetch(url, {
    redirect: 'error',
  });

  // SECURITY: Validate content-type is actually an image
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.startsWith('image/')) {
    throw new Error('Invalid content type - must be an image');
  }

  // SECURITY: Check content-length to prevent memory exhaustion
  const contentLength = response.headers.get('content-length');
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (contentLength && parseInt(contentLength) > maxSize) {
    throw new Error('Image too large - maximum 10MB');
  }

  const buffer = await response.arrayBuffer();

  // SECURITY: Double-check actual size after download
  if (buffer.byteLength > maxSize) {
    throw new Error('Image too large - maximum 10MB');
  }

  const base64 = Buffer.from(buffer).toString('base64');
  const mediaType = contentType.split('/')[1] || 'jpeg';

  return { base64, mediaType };
}

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const rawData = await request.json();
    const validationResult = estimateRequestSchema.safeParse(rawData);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid request data',
          details: validationResult.error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message
          }))
        },
        { status: 400 }
      );
    }

    const { photos, notes } = validationResult.data;

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const anthropic = new Anthropic({ apiKey });

    // Convert all photos to base64
    const imageContents = await Promise.all(
      photos.map(async (photo: any, index: number) => {
        try {
          const { base64, mediaType } = await urlToBase64(photo.url);
          return {
            type: 'image' as const,
            source: {
              type: 'base64' as const,
              media_type: `image/${mediaType}` as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
              data: base64,
            },
          };
        } catch (err) {
          throw new Error(`Failed to process photo ${index + 1}: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
      })
    );

    const prompt = `You are an expert junk removal estimator. Analyze these photos carefully and provide a detailed, accurate estimate.

${notes ? `Additional notes from customer: ${notes}` : ''}

CRITICAL: Your estimate must reflect the ACTUAL LOADED VOLUME in a truck after items are broken down, stacked, and compressed efficiently. DO NOT simply add up individual item volumes - that leads to massive overestimation.

Your task:
1. Identify and list EVERY visible item in the photos
2. Estimate the compressed cubic yards for each item (as it would fit in a truck)
3. Calculate conservative, mid-range, and higher TOTAL volume estimates
4. Provide a recommended price using $46 per cubic yard

REALISTIC Volume Guidelines (compressed/loaded volume):
- Standard couch/sofa: 1.5-2.25 cubic yards (breaks down and compresses)
- Loveseat: 1.1-1.5 cubic yards
- Single chairs/ottomans: 0.4-0.75 cubic yard each
- Mattress (queen/king): 1.5-2.25 cubic yards (compresses significantly)
- Small boxes (12"x12"): 0.11-0.19 cubic yards each
- Medium boxes (18"x18"): 0.22-0.37 cubic yards each
- Large boxes (24"x24"): 0.37-0.6 cubic yards each
- Mini fridge/small appliances: 1.1-1.9 cubic yards
- Full-size refrigerator: 2.25-3 cubic yards
- Entertainment centers/cabinets: 1.5-2.25 cubic yards (disassembled)
- 4-tier shelving units: 1.1-1.9 cubic yards (disassembled)
- Desks: 1.5-2.25 cubic yards
- File cabinets: 0.75-1.5 cubic yards each

IMPORTANT ESTIMATION RULES:
- Items stack efficiently in trucks (20-30% volume reduction from efficient packing)
- Furniture breaks down (remove legs, cushions separate)
- Boxes compress and nestle together
- ALWAYS be conservative - lower is better than higher
- A typical 10x10 storage unit when full = 12-18 cubic yards loaded
- Remember: Items compress significantly more than they appear. Always err on the side of LOWER estimates.
- Professional haulers are experts at maximizing truck space - assume maximum compression

For reference: A standard pickup truck bed holds about 2.5 cubic yards. A typical junk removal job is 4-8 cubic yards.

Format your response as JSON with these exact keys:
{
  "detectedItems": [
    {"item": "Item description", "volume": "~X cy"},
    {"item": "Item description", "volume": "~X cy"}
  ],
  "volumeBreakdown": {
    "conservative": "X cubic yards",
    "midRange": "X cubic yards",
    "high": "X cubic yards"
  },
  "estimatedVolume": "X-Y cubic yards",
  "priceRange": "$XXX-$XXX",
  "recommendedPrice": "$XXX-$XXX",
  "reasoning": "Detailed explanation of your methodology and how you calculated the volume",
  "confidence": "High/Medium/Low"
}`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            ...imageContents,
            {
              type: 'text' as const,
              text: prompt,
            },
          ],
        },
      ],
    });

    // Parse the response
    const responseText =
      message.content[0].type === 'text' ? message.content[0].text : '';

    // Extract JSON from the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse AI response');
    }

    const estimate = JSON.parse(jsonMatch[0]);

    return NextResponse.json(estimate);
  } catch (error: any) {
    // Only log errors in development
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error generating estimate:', error);
    }

    return NextResponse.json(
      {
        error: 'Failed to generate estimate',
        details: process.env.NODE_ENV !== 'production' ? error.message : 'An error occurred'
      },
      { status: 500 }
    );
  }
}
