import Link from 'next/link';

type EstimateResultProps = {
  estimate: {
    detectedItems?: Array<{ item: string; volume: string }>;
    volumeBreakdown?: {
      conservative: string;
      midRange: string;
      high: string;
    };
    estimatedVolume: string;
    priceRange: string;
    recommendedPrice?: string;
    reasoning: string;
    confidence: string;
  };
};

export default function EstimateResult({ estimate }: EstimateResultProps) {
  return (
    <div className="text-center">
        {/* Success Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-500/30">
        <svg
          className="h-10 w-10 text-white"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="3"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>

      <h2 className="mt-6 font-display text-3xl font-bold text-slate-900">
        Here's Your Instant Quote!
      </h2>
      <p className="mt-2 text-slate-600">
        Our AI has analyzed your photos and generated an estimate. We'll contact you shortly to confirm details.
      </p>

      {/* Main Glassmorphic Card */}
      <div className="mt-8 relative rounded-2xl bg-gradient-to-br from-bronze via-bronze-light to-bronze-dark p-[2px] shadow-2xl shadow-bronze/50">
        <div className="rounded-2xl bg-white/10 backdrop-blur-md p-8 text-white">
          {/* AI Estimate Badge */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
            </svg>
            AI Estimate
          </div>

          <p className="text-sm font-medium text-white/90">Your AI-Powered Estimate</p>

          {/* Price Display */}
          <div className="mt-2">
            <div className="text-5xl font-bold font-display tracking-tight">
              {estimate.priceRange}
            </div>
            <p className="mt-2 text-sm text-white/80">
              Based on {estimate.estimatedVolume}
            </p>
          </div>

          {/* What's Included */}
          <div className="mt-6 rounded-xl bg-white/10 backdrop-blur-sm p-4 text-left">
            <p className="text-sm font-semibold mb-3">What's included:</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <svg className="h-5 w-5 flex-shrink-0 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                Labor and equipment
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-5 w-5 flex-shrink-0 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                Eco-friendly disposal fees
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-5 w-5 flex-shrink-0 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                Donation/recycling coordination
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Detected Items Section */}
      {estimate.detectedItems && estimate.detectedItems.length > 0 && (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 text-left shadow-lg">
          <h3 className="font-display text-lg font-semibold text-slate-900 mb-4">
            Detected Items
          </h3>
          <div className="space-y-2">
            {estimate.detectedItems.map((item, index) => (
              <div key={index} className="flex items-start justify-between py-2 border-b border-slate-100 last:border-0">
                <span className="text-sm text-slate-700">{item.item}</span>
                <span className="text-sm font-medium text-slate-900 ml-4">{item.volume}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Volume Breakdown (if available) */}
      {estimate.volumeBreakdown && (
        <div className="mt-6 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-cream-dark p-6 text-left shadow-md">
          <h3 className="font-display text-lg font-semibold text-slate-900 mb-4">
            Volume Breakdown
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-slate-600 mb-1">Conservative</p>
              <p className="text-lg font-semibold text-slate-900">{estimate.volumeBreakdown.conservative}</p>
            </div>
            <div className="border-x border-slate-200">
              <p className="text-xs text-slate-600 mb-1">Mid-Range</p>
              <p className="text-lg font-semibold text-bronze">{estimate.volumeBreakdown.midRange}</p>
            </div>
            <div>
              <p className="text-xs text-slate-600 mb-1">High</p>
              <p className="text-lg font-semibold text-slate-900">{estimate.volumeBreakdown.high}</p>
            </div>
          </div>
        </div>
      )}

      {/* AI Analysis */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 text-left shadow-md">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-lg font-semibold text-slate-900">
            AI Analysis
          </h3>
          <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
            estimate.confidence === 'High' ? 'bg-green-100 text-green-700' :
            estimate.confidence === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
            'bg-orange-100 text-orange-700'
          }`}>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
            </svg>
            {estimate.confidence} Confidence
          </span>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">{estimate.reasoning}</p>
      </div>

      {/* What Happens Next */}
      <div className="mt-8 rounded-xl border-2 border-bronze/30 bg-gradient-to-br from-cream-dark to-white p-6">
        <h3 className="font-display text-xl font-bold text-charcoal">
          What Happens Next - Simple & Professional
        </h3>
        <ul className="mt-4 space-y-3 text-left text-sm text-slate-700">
          <li className="flex items-start gap-3">
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-bronze text-white text-xs font-bold">
              1
            </div>
            <span>We've received your request and will contact you within 1 hour to confirm</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-bronze text-white text-xs font-bold">
              2
            </div>
            <span>We'll review final pricing and schedule a convenient pickup time (same-day often available)</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-bronze text-white text-xs font-bold">
              3
            </div>
            <span>Our professional team arrives on time, hauls everything, and cleans up spotlessly</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-bronze text-white text-xs font-bold">
              4
            </div>
            <span>Items are donated or recycled when possible - you get a receipt for tax purposes</span>
          </li>
        </ul>
      </div>

      {/* CTA Buttons */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <a
          href="tel:+18445435865"
          className="inline-flex items-center justify-center rounded-lg bg-bronze px-8 py-4 text-base font-semibold text-white hover:opacity-90 transition-all shadow-lg shadow-bronze/30 hover:shadow-xl hover:shadow-bronze/40"
        >
          <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
            />
          </svg>
          Call Us Now
        </a>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg border-2 border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-900 hover:bg-slate-50 transition-all"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
