import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

// Helper function to convert image URL to base64
async function urlToBase64(url: string): Promise<{ base64: string; mediaType: string }> {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');

  // Determine media type from URL or response
  const contentType = response.headers.get('content-type') || 'image/jpeg';
  const mediaType = contentType.split('/')[1] || 'jpeg';

  return { base64, mediaType };
}

export async function POST(request: NextRequest) {
  try {
    const { photos, notes } = await request.json();

    console.log('📸 Estimate API called with:', { photoCount: photos?.length, notes });

    if (!photos || photos.length === 0) {
      return NextResponse.json(
        { error: 'At least one photo is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('❌ ANTHROPIC_API_KEY not configured');
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const anthropic = new Anthropic({ apiKey });

    // Convert all photos to base64
    console.log('🔄 Converting photos to base64...');
    const imageContents = await Promise.all(
      photos.map(async (photo: any, index: number) => {
        try {
          const { base64, mediaType } = await urlToBase64(photo.url);
          console.log(`✅ Photo ${index + 1} converted (${mediaType})`);
          return {
            type: 'image' as const,
            source: {
              type: 'base64' as const,
              media_type: `image/${mediaType}` as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
              data: base64,
            },
          };
        } catch (err) {
          console.error(`❌ Failed to convert photo ${index + 1}:`, err);
          throw new Error(`Failed to process photo ${index + 1}`);
        }
      })
    );

    const prompt = `You are an expert junk removal estimator. Analyze these photos carefully and provide a detailed, accurate estimate.

${notes ? `Additional notes from customer: ${notes}` : ''}

Your task:
1. Identify and list EVERY visible item in the photos
2. Estimate the cubic yards for each item individually
3. Calculate conservative, mid-range, and higher total volume estimates
4. Provide a recommended price using $55 per cubic yard

Guidelines for volume estimation:
- Standard couch/sofa: 3-4 cubic yards
- Chairs/ottomans: 1-2 cubic yards each
- Mattress (queen/king): 3-4 cubic yards
- Boxes (medium): 0.5-1 cubic yard each
- Large appliances: 2-4 cubic yards
- Entertainment centers/cabinets: 3-5 cubic yards
- Consider stacking efficiency and air space

Format your response as JSON with these exact keys:
{
  "detectedItems": [
    {"item": "Item description", "volume": "X-Y cubic yards"},
    {"item": "Item description", "volume": "X cubic yards"}
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

    console.log('🤖 Calling Anthropic API...');
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

    console.log('✅ Anthropic API response received');

    // Parse the response
    const responseText =
      message.content[0].type === 'text' ? message.content[0].text : '';

    console.log('📄 AI Response:', responseText);

    // Extract JSON from the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('❌ Failed to extract JSON from response');
      throw new Error('Failed to parse AI response');
    }

    const estimate = JSON.parse(jsonMatch[0]);
    console.log('✅ Estimate generated:', estimate);

    return NextResponse.json(estimate);
  } catch (error: any) {
    console.error('❌ Error generating estimate:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      {
        error: 'Failed to generate estimate',
        details: error.message
      },
      { status: 500 }
    );
  }
}
