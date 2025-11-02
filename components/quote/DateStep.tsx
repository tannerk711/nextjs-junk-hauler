import { useFormContext } from 'react-hook-form';

export default function DateStep() {
  const { setValue, watch } = useFormContext();
  const datePreference = watch('datePreference') || 'asap';

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-slate-900">
        When do you need the junk removed?
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        We offer same-day and next-day service based on availability.
      </p>

      <div className="mt-8 space-y-4">
        <button
          type="button"
          onClick={() => setValue('datePreference', 'asap')}
          className={`flex w-full items-start rounded-lg border-2 p-6 text-left transition-all hover:border-blue-300 hover:bg-blue-50/50 ${
            datePreference === 'asap'
              ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600 ring-offset-2'
              : 'border-slate-200 bg-white'
          }`}
        >
          <div className="flex-shrink-0">
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                datePreference === 'asap'
                  ? 'border-blue-600 bg-blue-600'
                  : 'border-slate-300 bg-white'
              }`}
            >
              {datePreference === 'asap' && (
                <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                  <circle cx="6" cy="6" r="3" />
                </svg>
              )}
            </div>
          </div>
          <div className="ml-4">
            <h3
              className={`text-base font-semibold ${
                datePreference === 'asap' ? 'text-blue-900' : 'text-slate-900'
              }`}
            >
              As Soon As Possible (ASAP)
            </h3>
            <p
              className={`mt-1 text-sm ${
                datePreference === 'asap' ? 'text-blue-700' : 'text-slate-600'
              }`}
            >
              We'll schedule you for the next available slot
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setValue('datePreference', 'specific')}
          className={`flex w-full items-start rounded-lg border-2 p-6 text-left transition-all hover:border-blue-300 hover:bg-blue-50/50 ${
            datePreference === 'specific'
              ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600 ring-offset-2'
              : 'border-slate-200 bg-white'
          }`}
        >
          <div className="flex-shrink-0">
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                datePreference === 'specific'
                  ? 'border-blue-600 bg-blue-600'
                  : 'border-slate-300 bg-white'
              }`}
            >
              {datePreference === 'specific' && (
                <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                  <circle cx="6" cy="6" r="3" />
                </svg>
              )}
            </div>
          </div>
          <div className="ml-4 flex-1">
            <h3
              className={`text-base font-semibold ${
                datePreference === 'specific' ? 'text-blue-900' : 'text-slate-900'
              }`}
            >
              Specific Date
            </h3>
            <p
              className={`mt-1 text-sm ${
                datePreference === 'specific' ? 'text-blue-700' : 'text-slate-600'
              }`}
            >
              Choose a preferred date (subject to availability)
            </p>
          </div>
        </button>
      </div>

      {datePreference === 'specific' && (
        <div className="mt-6 rounded-lg bg-blue-50 p-4">
          <div className="flex items-start">
            <svg
              className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
            <div className="ml-3">
              <p className="text-sm font-medium text-blue-900">Note about scheduling</p>
              <p className="mt-1 text-sm text-blue-800">
                Your selected date is a preferred date. We'll confirm the exact time when we
                contact you with your quote.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
