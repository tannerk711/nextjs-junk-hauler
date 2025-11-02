import { useFormContext } from 'react-hook-form';

const cities = [
  'Boise',
  'Meridian',
  'Eagle',
  'Star',
  'Nampa',
  'Caldwell',
  'Kuna',
  'Garden City',
];

export default function LocationStep() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const difficultAccess = watch('difficultAccess');

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-slate-900">
        Where is the junk located?
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        We serve the entire Treasure Valley and surrounding areas.
      </p>

      <div className="mt-8 space-y-6">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-slate-900">
            City
          </label>
          <select
            id="city"
            {...register('city', { required: 'City is required' })}
            className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Select a city</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city.message as string}</p>
          )}
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-slate-900">
            Street Address <span className="text-slate-500">(optional)</span>
          </label>
          <input
            type="text"
            id="address"
            {...register('address')}
            placeholder="123 Main St"
            className="mt-2 block w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <p className="mt-1 text-xs text-slate-500">
            Full address helps us provide a more accurate estimate
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <button
            type="button"
            onClick={() => setValue('difficultAccess', !difficultAccess)}
            className="flex w-full items-center justify-between text-left"
          >
            <div className="flex items-center">
              <div
                className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 ${
                  difficultAccess
                    ? 'border-blue-600 bg-blue-600'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {difficultAccess && (
                  <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                    <path d="M10.97 1.97a.75.75 0 0 1 0 1.06L5.25 8.75 2.03 5.53a.75.75 0 0 1 1.06-1.06L5.25 6.63l4.66-4.66a.75.75 0 0 1 1.06 0z" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-slate-900">Difficult access</p>
                <p className="text-xs text-slate-600">
                  Check if there are stairs, narrow hallways, or other access challenges
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
