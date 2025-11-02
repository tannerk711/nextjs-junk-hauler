import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-32 sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-5xl font-bold tracking-tight text-slate-900 sm:text-7xl">
            <span className="block text-blue-600">Junk Yard Gentlemen</span>
            <span className="block text-3xl sm:text-4xl mt-4">Professional Junk Removal</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Fast, affordable, and eco-friendly junk removal throughout the Treasure Valley.
            Get an instant AI-powered quote in minutes!
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/quote"
              className="rounded-lg bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all"
            >
              Get Instant Quote
            </Link>
            <a
              href="tel:+18445435865"
              className="text-base font-semibold leading-6 text-slate-900 hover:text-blue-600 transition-colors"
            >
              Call (844) 543-JUNK <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mx-auto mt-32 max-w-7xl">
          <h2 className="font-display text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            What We Remove
          </h2>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.name}
                className="relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold text-slate-900">{service.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Service Areas */}
        <div className="mx-auto mt-32 max-w-7xl">
          <h2 className="font-display text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Serving the Treasure Valley
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {serviceAreas.map((area) => (
              <span
                key={area}
                className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mx-auto mt-32 max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Ready to clear out that junk?
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Our AI-powered quote system analyzes your photos to provide instant, accurate estimates.
          </p>
          <div className="mt-10">
            <Link
              href="/quote"
              className="rounded-lg bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-blue-500 transition-all inline-block"
            >
              Start Your Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="flex justify-center gap-8 text-sm text-slate-600 mb-4">
            <Link href="/privacy" className="hover:text-blue-600">Privacy Policy</Link>
            <a href="tel:+18445435865" className="hover:text-blue-600">(844) 543-JUNK</a>
          </div>
          <p className="text-center text-sm text-slate-600">
            &copy; 2025 Junk Yard Gentlemen. Licensed and Insured. Serving the Treasure Valley.
          </p>
        </div>
      </footer>
    </div>
  );
}

const services = [
  {
    name: 'Furniture Removal',
    icon: '🛋️',
    description: 'Old couches, mattresses, tables, and more',
  },
  {
    name: 'Appliance Haul-Away',
    icon: '🔌',
    description: 'Refrigerators, washers, dryers, and electronics',
  },
  {
    name: 'Construction Debris',
    icon: '🏗️',
    description: 'Drywall, lumber, flooring, and renovation waste',
  },
  {
    name: 'Yard Waste',
    icon: '🌳',
    description: 'Branches, leaves, stumps, and landscaping debris',
  },
  {
    name: 'Estate Cleanouts',
    icon: '🏠',
    description: 'Full property cleanouts and downsizing',
  },
  {
    name: 'Commercial Junk',
    icon: '🏢',
    description: 'Office furniture, equipment, and warehouse cleanouts',
  },
];

const serviceAreas = [
  'Boise',
  'Meridian',
  'Eagle',
  'Star',
  'Nampa',
  'Caldwell',
  'Kuna',
  'Garden City',
];
