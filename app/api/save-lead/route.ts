import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema for lead data
const leadDataSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(255),
  phone: z.string().regex(/^[\d\s\-\(\)\+]+$/).min(10).max(20),
  address: z.string().max(200).optional(),
  city: z.string().min(2).max(100),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code format'),
  photos: z.array(z.object({
    url: z.string().url().max(500),
    publicId: z.string().max(200).optional(),
    thumbnail: z.string().url().max(500).optional(),
  })).min(1).max(10),
  notes: z.string().max(500).optional(),
  estimate: z.object({
    estimatedVolume: z.string().max(50),
    priceRange: z.string().max(50),
    reasoning: z.string().max(2000),
    confidence: z.enum(['High', 'Medium', 'Low']),
  }),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const rawData = await request.json();
    const validationResult = leadDataSchema.safeParse(rawData);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid lead data',
          details: validationResult.error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message
          }))
        },
        { status: 400 }
      );
    }

    const leadData = validationResult.data;

    // Send to Zapier webhook (which connects to Go High Level)
    const zapierWebhookUrl = process.env.ZAPIER_WEBHOOK_URL;

    if (!zapierWebhookUrl) {
      return NextResponse.json(
        { error: 'Webhook not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(zapierWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone,
        address: leadData.address ? `${leadData.address}, ${leadData.city}, ${leadData.zip}` : `${leadData.city}, ${leadData.zip}`,
        city: leadData.city,
        zip: leadData.zip,
        photos: leadData.photos.map((p) => p.url).join(', '),
        notes: leadData.notes || '',
        estimatedVolume: leadData.estimate.estimatedVolume,
        priceRange: leadData.estimate.priceRange,
        reasoning: leadData.estimate.reasoning,
        confidence: leadData.estimate.confidence,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send to Zapier');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    // Only log errors in development
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error saving lead:', error);
    }

    return NextResponse.json(
      { error: 'Failed to save lead' },
      { status: 500 }
    );
  }
}
