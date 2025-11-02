# Rate Limiting Implementation Guide

## Why Rate Limiting is Important

Without rate limiting, your API endpoints are vulnerable to:
- **Cost abuse**: Attackers can spam your Anthropic API and rack up $1000s in charges
- **CRM flooding**: Fake leads spamming your Go High Level system
- **DOS attacks**: Overwhelming your server with requests
- **Resource exhaustion**: Memory and bandwidth abuse

## Current Status

**⚠️ RATE LIMITING IS NOT YET IMPLEMENTED**

This is a **HIGH PRIORITY** item to complete before high-traffic launch.

---

## Recommended Solution: Vercel Edge Middleware + Upstash Redis

### Option 1: Upstash Redis (Recommended - $0-10/month)

**Pros:**
- Distributed rate limiting (works across Vercel serverless functions)
- Easy integration with Next.js
- Free tier: 10,000 requests/day
- Persistent storage (survives deploys)

**Setup Instructions:**

#### 1. Create Upstash Account
```bash
# Go to: https://console.upstash.com/
# Sign up for free account
# Create a new Redis database (choose closest region to your users)
```

#### 2. Install Dependencies
```bash
cd nextjs-junk-hauler
npm install @upstash/ratelimit @upstash/redis
```

#### 3. Add Environment Variables

Add to `.env.local` and Vercel:
```bash
UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-redis-token
```

#### 4. Create Middleware

Create `nextjs-junk-hauler/middleware.ts`:

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Create rate limiter instance
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests per minute per IP
  analytics: true,
  prefix: 'ratelimit',
});

export async function middleware(request: NextRequest) {
  // Only rate limit API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = request.ip ?? request.headers.get('x-forwarded-for') ?? '127.0.0.1';

    const { success, limit, reset, remaining } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          retryAfter: Math.ceil((reset - Date.now()) / 1000)
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((reset - Date.now()) / 1000)),
            'X-RateLimit-Limit': String(limit),
            'X-RateLimit-Remaining': String(remaining),
            'X-RateLimit-Reset': String(reset),
          }
        }
      );
    }

    // Add rate limit headers to successful responses
    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Limit', String(limit));
    response.headers.set('X-RateLimit-Remaining', String(remaining));
    response.headers.set('X-RateLimit-Reset', String(reset));

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
```

#### 5. Test Rate Limiting

```bash
# Start dev server
npm run dev

# Test with multiple rapid requests (use curl, Postman, or browser)
# Should see 429 error after 10 requests within 1 minute
curl -X POST http://localhost:3000/api/estimate \
  -H "Content-Type: application/json" \
  -d '{"photos":[{"url":"https://example.com"}]}'
```

#### 6. Adjust Rate Limits (Optional)

Different endpoints may need different limits:

```typescript
// More permissive for quotes (10 per minute)
const quoteLimiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m'),
});

// Stricter for lead submission (3 per minute)
const leadLimiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, '1 m'),
});

// In middleware:
if (request.nextUrl.pathname === '/api/estimate') {
  const { success } = await quoteLimiter.limit(ip);
  // ...
} else if (request.nextUrl.pathname === '/api/save-lead') {
  const { success } = await leadLimiter.limit(ip);
  // ...
}
```

---

### Option 2: Vercel Built-in Protection (Free but Limited)

Vercel provides some DDoS protection automatically, but it's not granular:
- **Pros**: Free, no setup required
- **Cons**: Not customizable, no per-endpoint control

To enable:
1. Go to Vercel Dashboard → Project Settings → Firewall
2. Enable "DDoS Protection" (Pro plan required)

---

### Option 3: In-Memory Rate Limiting (Not Recommended)

**⚠️ WARNING**: Only works for single-server deployments. Will NOT work correctly on Vercel serverless functions.

If you absolutely cannot use Upstash, you can implement basic in-memory limiting:

```typescript
// middleware.ts (NOT RECOMMENDED for production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = request.ip ?? '127.0.0.1';
    const now = Date.now();
    const limit = 10;
    const windowMs = 60000; // 1 minute

    const userLimit = rateLimitMap.get(ip);

    if (!userLimit || userLimit.resetTime < now) {
      rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    } else {
      if (userLimit.count >= limit) {
        return NextResponse.json(
          { error: 'Too many requests' },
          { status: 429 }
        );
      }
      userLimit.count++;
    }

    // Cleanup old entries periodically
    if (Math.random() < 0.01) { // 1% of requests
      for (const [key, value] of rateLimitMap.entries()) {
        if (value.resetTime < now) {
          rateLimitMap.delete(key);
        }
      }
    }
  }

  return NextResponse.next();
}
```

**Problems with this approach:**
- Resets on every deploy
- Doesn't work across multiple serverless function instances
- Memory leaks if not cleaned up properly
- No distributed coordination

---

## Recommended Rate Limits

Based on typical usage patterns:

| Endpoint | Limit | Window | Reasoning |
|----------|-------|--------|-----------|
| `/api/estimate` | 10 | 1 minute | Allows multiple quote attempts, prevents API abuse |
| `/api/save-lead` | 3 | 1 minute | Stricter to prevent CRM spam |
| All API routes | 20 | 1 minute | Fallback for any API endpoint |

---

## Testing Rate Limits

After implementation, test with:

```bash
# Install testing tool
npm install -g autocannon

# Spam endpoint with 100 requests
autocannon -c 100 -d 5 -m POST http://localhost:3000/api/estimate

# Should see mix of 200s and 429s
```

---

## Cost Estimate

| Service | Free Tier | Cost if Exceeded |
|---------|-----------|------------------|
| Upstash Redis | 10,000 requests/day | $0.20 per 100K requests |
| Vercel Pro | Included | $20/month |

**Recommendation**: Start with Upstash free tier. You'll likely stay under the limit for months.

---

## Priority Level: 🔴 HIGH

**Implement before:**
- High-traffic Google Ads campaigns
- Social media promotion
- Any public launch

**Can wait if:**
- Low traffic expected (<100 visitors/day)
- Testing phase only
- Friends and family beta

---

## Next Steps

1. **Immediate**: Monitor your Anthropic API usage at https://console.anthropic.com/
2. **Before launch**: Set up Upstash + rate limiting middleware
3. **Post-launch**: Monitor rate limit hits in Upstash analytics
4. **Adjust**: Fine-tune limits based on real usage patterns

---

**Questions?** Check:
- Upstash Docs: https://upstash.com/docs/redis/features/ratelimiting
- Vercel Middleware: https://nextjs.org/docs/app/building-your-application/routing/middleware
- Next.js Rate Limiting: https://vercel.com/guides/rate-limiting-edge-middleware-vercel-kv
