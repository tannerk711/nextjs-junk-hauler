import { useFormContext } from 'react-hook-form';

const junkTypes = [
  { value: 'furniture', label: 'Furniture (sofas, chairs, tables)' },
  { value: 'appliances', label: 'Appliances (fridges, washers, stoves)' },
  { value: 'mattresses', label: 'Mattresses & Box Springs' },
  { value: 'electronics', label: 'Electronics & E-Waste' },
  { value: 'exercise', label: 'Exercise Equipment' },
  { value: 'hot-tubs', label: 'Hot Tubs & Spas' },
  { value: 'construction', label: 'Construction Debris' },
  { value: 'yard-waste', label: 'Yard Waste & Branches' },
  { value: 'office', label: 'Office Furniture & Equipment' },
  { value: 'retail', label: 'Retail Fixtures' },
  { value: 'household', label: 'General Household Items' },
  { value: 'other', label: 'Other (specify in notes)' },
];

export default function JunkTypeStep() {
  const { setValue, watch } = useFormContext();
  const selectedTypes = watch('junkTypes') || [];

  const toggleType = (value: string) => {
    const currentTypes = selectedTypes || [];
    const newTypes = currentTypes.includes(value)
      ? currentTypes.filter((t: string) => t !== value)
      : [...currentTypes, value];
    setValue('junkTypes', newTypes, { shouldValidate: true });
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-slate-900">
        What type of junk needs removal?
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        Select all that apply. This helps us prepare the right equipment.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {junkTypes.map((type) => {
          const isSelected = selectedTypes.includes(type.value);
          return (
            <button
              key={type.value}
              type="button"
              onClick={() => toggleType(type.value)}
              className={`flex items-center rounded-lg border-2 p-4 text-left transition-all hover:border-blue-300 hover:bg-blue-50/50 ${
                isSelected
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div
                className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 ${
                  isSelected
                    ? 'border-blue-600 bg-blue-600'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {isSelected && (
                  <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                    <path d="M10.97 1.97a.75.75 0 0 1 0 1.06L5.25 8.75 2.03 5.53a.75.75 0 0 1 1.06-1.06L5.25 6.63l4.66-4.66a.75.75 0 0 1 1.06 0z" />
                  </svg>
                )}
              </div>
              <span
                className={`ml-3 text-sm font-medium ${
                  isSelected ? 'text-blue-900' : 'text-slate-900'
                }`}
              >
                {type.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
