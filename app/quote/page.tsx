'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Link from 'next/link';
import Logo from '@/components/Logo';
import PropertyTypeStep from '@/components/quote/PropertyTypeStep';
import JunkTypeStep from '@/components/quote/JunkTypeStep';
import LocationStep from '@/components/quote/LocationStep';
import DateStep from '@/components/quote/DateStep';
import PhotoUploadStep from '@/components/quote/PhotoUploadStep';
import ContactStep from '@/components/quote/ContactStep';
import EstimateResult from '@/components/quote/EstimateResult';
import LoadingAnimation from '@/components/quote/LoadingAnimation';

type FormData = {
  propertyType: string;
  junkTypes: string[];
  city: string;
  address?: string;
  zip: string;
  difficultAccess?: boolean;
  datePreference: string;
  photos: Array<{
    url: string;
    publicId: string;
    thumbnail: string;
  }>;
  name: string;
  phone: string;
  email: string;
  notes?: string;
};

type Estimate = {
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

const stepLabels = ['Property', 'Junk Type', 'Location', 'Date', 'Photos', 'Contact'];

export default function QuotePage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const methods = useForm<FormData>({
    defaultValues: {
      propertyType: '',
      junkTypes: [],
      city: '',
      address: '',
      zip: '',
      difficultAccess: false,
      datePreference: 'asap',
      photos: [],
      name: '',
      phone: '',
      email: '',
      notes: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setIsGenerating(true);

    try {
      // Call AI estimation API with timeout
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 25000); // 25 second client timeout

      const estimateRes = await fetch('/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photos: data.photos, notes: data.notes }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!estimateRes.ok) {
        const errorData = await estimateRes.json();
        throw new Error(errorData.details || 'Failed to get estimate');
      }

      const estimateData = await estimateRes.json();
      setEstimate(estimateData);

      // Save lead to Zapier/GHL
      const saveLeadRes = await fetch('/api/save-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          estimate: estimateData,
        }),
      });

      if (!saveLeadRes.ok) {
        const errorData = await saveLeadRes.json();
        console.error('Failed to save lead:', errorData);
        // Still show results but log the error
        alert('Your quote was generated successfully, but there was an issue saving your information. Please call us directly at (844) 543-JUNK');
      }

      setIsGenerating(false);
      setStep(7); // Show results
    } catch (error: any) {
      console.error('Error submitting quote:', error);
      setIsGenerating(false);

      // Provide helpful error messages
      let errorMessage = error.message || 'An error occurred';
      if (error.name === 'AbortError') {
        errorMessage = 'Request timed out - please try with fewer or smaller photos';
      }

      alert(`Failed to generate quote: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-bronze hover:opacity-80 transition-colors"
          >
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            Back to Home
          </Link>
          <Logo variant="light" size="sm" href="/" />
        </div>

        {/* Progress Bar */}
        {step < 7 && (
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4, 5, 6].map((stepNum, idx) => (
                <div key={stepNum} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                        step >= stepNum
                          ? 'bg-bronze text-white shadow-md'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {stepNum}
                    </div>
                    <p
                      className={`mt-2 text-xs font-medium hidden sm:block ${
                        step >= stepNum ? 'text-bronze' : 'text-slate-500'
                      }`}
                    >
                      {stepLabels[idx]}
                    </p>
                  </div>
                  {stepNum < 6 && (
                    <div
                      className={`h-0.5 flex-1 transition-all ${
                        step > stepNum ? 'bg-bronze' : 'bg-slate-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Form Content */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xl">
          {isGenerating ? (
            <LoadingAnimation />
          ) : (
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                {step === 1 && <PropertyTypeStep />}
                {step === 2 && <JunkTypeStep />}
                {step === 3 && <LocationStep />}
                {step === 4 && <DateStep />}
                {step === 5 && <PhotoUploadStep />}
                {step === 6 && <ContactStep />}
                {step === 7 && estimate && <EstimateResult estimate={estimate} />}

              {/* Navigation Buttons */}
              {step < 7 && (
                <div className="mt-10 flex justify-between gap-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={step === 1 || isSubmitting}
                    className={`rounded-lg border-2 border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-400 disabled:opacity-0 disabled:pointer-events-none`}
                  >
                    Back
                  </button>
                  {step < 6 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="rounded-lg bg-bronze px-8 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90 hover:shadow-xl transition-all"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-lg bg-bronze px-8 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Getting Your Quote...
                        </span>
                      ) : (
                        'Get My Free Quote'
                      )}
                    </button>
                  )}
                </div>
              )}
            </form>
          </FormProvider>
          )}
        </div>
      </div>
    </div>
  );
}
