import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/components/Logo';

export default function Home() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <Logo variant="light" size="md" href="/" />
        </div>
      </header>

      {/* Hero Section with Background Image */}
      <div className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-truck.jpg"
            alt="Junk Hauler Truck in Treasure Valley Idaho"
            fill
            priority
            className="object-cover"
          />
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-24 sm:pt-40 sm:pb-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* Social Proof Badge */}
            <div className="mb-8 inline-flex items-center rounded-full bg-charcoal/40 backdrop-blur-md px-4 py-2 text-sm font-medium text-cream border-2 border-bronze-light shadow-lg drop-shadow-lg">
              <svg className="w-5 h-5 mr-2 text-bronze-light" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              500+ Treasure Valley Cleanouts Completed
            </div>

            <h1 className="font-display text-5xl font-bold tracking-tight text-white sm:text-7xl leading-tight">
              <span className="block text-bronze-light drop-shadow-2xl">Professional Junk Removal</span>
              <span className="block text-3xl sm:text-5xl mt-4 text-cream drop-shadow-xl">with White-Glove Service</span>
            </h1>
            <p className="mt-8 text-xl leading-8 text-slate-200 max-w-2xl mx-auto drop-shadow-lg">
              Respectful, stress-free service that treats your property with care. Serving Boise and the Treasure Valley with eco-friendly junk removal you can trust.
            </p>

            {/* CTAs */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/quote"
                className="w-full sm:w-auto rounded-lg bg-bronze px-10 py-4 text-lg font-semibold text-white shadow-lg hover:bg-bronze/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze transition-all hover:shadow-xl hover:scale-105"
              >
                Get AI-Powered Quote
              </Link>
              <a
                href="tel:+18445435865"
                className="w-full sm:w-auto rounded-lg border-2 border-cream px-10 py-4 text-lg font-semibold text-cream hover:bg-cream hover:text-charcoal transition-all"
              >
                Call (844) 543-JUNK
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-cream drop-shadow-lg">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-bronze" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-bronze" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">Same-Day Available</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-bronze" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">80% Recycled or Donated</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Why Professional Service Matters Section */}
        <div className="mx-auto mt-32 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold tracking-tight text-charcoal sm:text-5xl">
              Why Professional Service Matters
            </h2>
            <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
              Not all junk removal services are created equal. Experience the difference of working with true professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((reason, index) => (
              <div
                key={index}
                className="relative rounded-2xl border-2 border-slate-200 bg-white p-8 shadow-md hover:shadow-xl hover-bronze-border transition-smooth hover-lift group"
              >
                <div className="w-14 h-14 rounded-full bg-bronze/10 flex items-center justify-center mb-6 group-hover:bg-bronze transition-colors">
                  <span className="text-3xl group-hover:scale-110 transition-transform">{reason.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-charcoal mb-3">{reason.title}</h3>
                <p className="text-slate-700 leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Local Expertise Section */}
        <div className="mx-auto mt-32 max-w-7xl">
          <div className="rounded-3xl bg-gradient-to-br from-charcoal via-slate-800 to-charcoal p-12 lg:p-16 shadow-2xl">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Treasure Valley Locals
              </h2>
              <p className="mt-4 text-xl text-slate-300">
                We understand the unique needs of Idaho communities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {localExpertise.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-bronze flex items-center justify-center">
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-300 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* What We Remove - Photo Cards Section */}
        <div className="mx-auto mt-32 max-w-7xl">
          <h2 className="font-display text-center text-3xl font-bold tracking-tight text-charcoal sm:text-4xl mb-4">
            What We Remove
          </h2>
          <p className="text-center text-lg text-slate-600 max-w-2xl mx-auto mb-16">
            From single items to full property cleanouts, we handle it all with care and professionalism
          </p>

          {/* 3-Column Photo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {serviceCategories.map((category, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-smooth overflow-hidden"
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Icon Badge - positioned to overlap image and content */}
                  <div className="absolute -bottom-8 left-6 w-16 h-16 rounded-full bg-bronze flex items-center justify-center shadow-lg z-10">
                    <span className="text-3xl">{category.icon}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="pt-12 px-6 pb-8">
                  {/* Category Name */}
                  <h3 className="text-xl font-bold text-charcoal mb-4">{category.name}</h3>

                  {/* Items List */}
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="text-bronze mt-1 flex-shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Service List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {detailedServices.map((service, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-lg bg-white border border-slate-200 hover:border-bronze hover:shadow-md transition-all"
              >
                <span className="text-2xl flex-shrink-0">{service.icon}</span>
                <div>
                  <h4 className="font-bold text-charcoal text-sm">{service.name}</h4>
                  <p className="text-xs text-slate-600 mt-1">{service.items}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How We Price Section */}
        <div className="mx-auto mt-32 max-w-7xl">
          <div className="rounded-3xl bg-gradient-to-br from-cream-dark to-white border-2 border-bronze/20 p-12 lg:p-16">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl font-bold tracking-tight text-charcoal sm:text-5xl">
                Transparent, Volume-Based Pricing
              </h2>
              <p className="mt-4 text-xl text-slate-700">
                No hidden fees. No surprise charges. Just honest pricing based on space used.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-charcoal mb-6">How It Works</h3>
                <div className="space-y-6">
                  {pricingSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-bronze text-white flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-charcoal mb-1">{step.title}</h4>
                        <p className="text-slate-700">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-6 bg-emerald-50 border-2 border-emerald-200 rounded-xl">
                  <p className="text-lg font-bold text-emerald-900">
                    Our Rate: $46 per cubic yard (compressed)
                  </p>
                  <p className="mt-2 text-sm text-emerald-800">
                    Most competitors charge by "minimum load" or "truck size" - we only charge for the space you actually use.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
                <h3 className="text-xl font-bold text-charcoal mb-6">Common Item Volumes</h3>
                <div className="space-y-4">
                  {volumeGuide.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0">
                      <span className="text-slate-700 font-medium">{item.item}</span>
                      <span className="text-bronze font-bold">{item.volume}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm text-slate-600 italic">
                  Volumes are estimates of compressed truck space. Your AI quote will provide exact pricing based on your photos.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Eco-Friendly Commitment Section */}
        <div className="mx-auto mt-32 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold tracking-tight text-charcoal sm:text-5xl">
              Eco-Friendly by Design
            </h2>
            <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
              We're committed to keeping the Treasure Valley beautiful by diverting waste from landfills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-white border-2 border-emerald-200 hover-lift transition-smooth">
              <div className="text-6xl mb-4">♻️</div>
              <div className="text-5xl font-bold text-emerald-600 mb-2">80%</div>
              <p className="text-lg font-semibold text-charcoal">Recycled or Donated</p>
              <p className="mt-2 text-sm text-slate-600">We divert 4 out of 5 items from landfills</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 hover-lift transition-smooth">
              <div className="text-6xl mb-4">🤝</div>
              <div className="text-5xl font-bold text-blue-600 mb-2">12+</div>
              <p className="text-lg font-semibold text-charcoal">Local Partners</p>
              <p className="mt-2 text-sm text-slate-600">Charities, recyclers, and donation centers</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-bronze/10 to-white border-2 border-bronze/30 hover-lift transition-smooth">
              <div className="text-6xl mb-4">🌲</div>
              <div className="text-5xl font-bold text-bronze mb-2">500+</div>
              <p className="text-lg font-semibold text-charcoal">Tons Diverted</p>
              <p className="mt-2 text-sm text-slate-600">Kept out of Idaho landfills in 2024</p>
            </div>
          </div>

          <div className="bg-slate-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-charcoal mb-6 text-center">Our Partners</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {ecoPartners.map((partner, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-2">{partner.icon}</div>
                  <p className="text-sm font-medium text-slate-700">{partner.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Service Areas */}
        <div className="mx-auto mt-32 max-w-7xl">
          <h2 className="font-display text-center text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
            Proudly Serving the Treasure Valley
          </h2>
          <p className="mt-4 text-center text-lg text-slate-600 max-w-2xl mx-auto">
            From the Boise Foothills to rural communities, we're your local junk removal experts
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceAreas.map((area) => (
              <div
                key={area.city}
                className="p-6 rounded-xl bg-white border-2 border-slate-200 hover:border-bronze transition-all hover:shadow-md hover-lift"
              >
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-6 h-6 text-bronze" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <h3 className="text-lg font-bold text-charcoal">{area.city}</h3>
                </div>
                <p className="text-sm text-slate-600">{area.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What Our Customers Say - Testimonials Section */}
        <div className="mx-auto mt-32 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold tracking-tight text-charcoal sm:text-5xl">
              What Our Customers Say
            </h2>
            <p className="mt-4 text-xl text-slate-600">
              Real reviews from real Treasure Valley residents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-md border border-slate-200 hover-lift transition-smooth hover:shadow-xl"
              >
                {/* Star Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-bronze" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-slate-700 leading-relaxed italic mb-6">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="border-t border-slate-200 pt-4">
                  <p className="font-bold text-charcoal">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mx-auto mt-32 mb-32 max-w-4xl">
          <div className="rounded-3xl bg-gradient-to-br from-bronze to-bronze-dark p-12 lg:p-16 shadow-2xl text-center">
            <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Ready for Stress-Free, Professional Service?
            </h2>
            <p className="mt-6 text-xl leading-8 text-cream max-w-2xl mx-auto">
              Get an instant, AI-powered quote in minutes. Our advanced system analyzes your photos to provide accurate, transparent pricing.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/quote"
                className="w-full sm:w-auto rounded-lg bg-white px-10 py-4 text-lg font-semibold text-bronze shadow-lg hover:bg-cream transition-all hover:scale-105"
              >
                Get Your Free Quote
              </Link>
              <a
                href="tel:+18445435865"
                className="w-full sm:w-auto rounded-lg border-2 border-white px-10 py-4 text-lg font-semibold text-white hover:bg-white hover:text-bronze transition-all"
              >
                Or Call Now
              </a>
            </div>
            <p className="mt-8 text-sm text-bronze-light">
              No commitment required • Same-day service available • Licensed & insured
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-300 bg-gradient-to-br from-charcoal via-slate-800 to-charcoal">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="flex justify-center mb-8">
            <Logo variant="dark" size="md" href="/" />
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-400 mb-6">
            <Link href="/privacy" className="hover:text-bronze transition-colors">Privacy Policy</Link>
            <a href="tel:+18445435865" className="hover:text-bronze transition-colors font-semibold">(844) 543-JUNK</a>
            <a href="mailto:info@junkyardgentlemen.com" className="hover:text-bronze transition-colors">Contact Us</a>
          </div>
          <p className="text-center text-sm text-slate-400">
            &copy; 2025 Junkyard Gentlemen. Licensed and Insured. Serving the Treasure Valley with Pride.
          </p>
          <p className="text-center text-xs text-slate-500 mt-2">
            Boise, Idaho | Eco-Friendly Junk Removal | Same-Day Service Available
          </p>
        </div>
      </footer>
    </div>
  );
}

// Data Constants

const whyChooseUs = [
  {
    icon: '🎩',
    title: 'Respectful Service',
    description: 'We treat your property like our own. No property damage, no mess left behind, and always courteous service.',
  },
  {
    icon: '🧹',
    title: 'Spotless Cleanup',
    description: 'We sweep and clean the area after removal. You won\'t even know we were there (except your junk will be gone).',
  },
  {
    icon: '👔',
    title: 'Professional Team',
    description: 'Uniformed, background-checked professionals. Not just anyone with a truck - actual trained specialists.',
  },
  {
    icon: '🔒',
    title: 'Trustworthy & Insured',
    description: 'Fully licensed and insured with comprehensive liability coverage. Your property is protected.',
  },
  {
    icon: '⏰',
    title: 'On-Time, Every Time',
    description: 'We respect your schedule. Arrive when promised, finish when estimated. No surprises.',
  },
  {
    icon: '🤝',
    title: 'Community First',
    description: 'Locally owned and operated. We donate usable items to Treasure Valley charities and families in need.',
  },
];

const localExpertise = [
  {
    icon: '🏘️',
    title: 'HOA Compliance Experts',
    description: 'We know Eagle and Meridian HOA rules inside out. Proper disposal documentation and scheduling to keep you compliant.',
  },
  {
    icon: '❄️',
    title: 'Seasonal Service',
    description: 'From spring yard cleanup to winter storage unit clearouts, we handle Idaho\'s unique seasonal needs year-round.',
  },
  {
    icon: '📈',
    title: 'Growth & Moving Specialists',
    description: 'Boise is booming! We help new residents settle in and departing neighbors move out smoothly.',
  },
  {
    icon: '🏗️',
    title: 'New Construction Ready',
    description: 'Supporting the Nampa and Meridian building boom with fast construction debris removal and site cleanup.',
  },
];

// New Photo-Based Service Categories
const serviceCategories = [
  {
    name: 'Residential Junk Removal',
    icon: '🏠',
    image: '/residential-cleanout.jpg',
    items: [
      'Appliances (refrigerators, washers, dryers)',
      'Furniture (sofas, beds, dressers)',
      'Mattresses and box springs',
      'Hot tubs and spas',
      'Carpets and rugs',
      'Exercise equipment',
      'Electronics and TVs',
    ],
  },
  {
    name: 'Commercial Junk Removal',
    icon: '🏢',
    image: '/commercial-office.jpg',
    items: [
      'Office furniture and desks',
      'Computers and electronics',
      'Filing cabinets',
      'Office supplies and equipment',
      'Retail fixtures',
      'Restaurant equipment',
      'Warehouse cleanouts',
    ],
  },
  {
    name: 'Storage Unit Cleanouts',
    icon: '📦',
    image: '/storage-unit.jpg',
    items: [
      'Full storage unit cleanouts',
      'Abandoned storage contents',
      'Boxes and containers',
      'Furniture and household goods',
      'Business inventory and supplies',
      'Personal belongings removal',
      'Climate-controlled unit cleanouts',
    ],
  },
];

// Detailed Service List
const detailedServices = [
  { icon: '🛋️', name: 'Furniture Removal', items: 'Sofas, beds, dressers' },
  { icon: '🔌', name: 'Appliance Haul-Away', items: 'Fridges, washers, dryers' },
  { icon: '🏗️', name: 'Construction Debris', items: 'Drywall, lumber, flooring' },
  { icon: '🌳', name: 'Yard Waste', items: 'Branches, stumps, lawn debris' },
  { icon: '🏠', name: 'Estate Cleanouts', items: 'Full property cleanouts' },
  { icon: '🛁', name: 'Hot Tubs & Spas', items: 'Hot tub removal & disposal' },
  { icon: '📺', name: 'Electronics', items: 'TVs, computers, e-waste' },
  { icon: '🪟', name: 'Retail Fixtures', items: 'Shelving, displays, counters' },
  { icon: '🍽️', name: 'Restaurant Equipment', items: 'Ovens, fridges, prep tables' },
];

const pricingSteps = [
  {
    title: 'Upload Photos',
    description: 'Take 2-3 photos of your junk. Our AI analyzes volume and provides instant estimates.',
  },
  {
    title: 'Get Instant Quote',
    description: 'Receive transparent pricing based on actual cubic yards your items will occupy (compressed).',
  },
  {
    title: 'Schedule Pickup',
    description: 'Choose same-day or schedule ahead. We arrive on time in our window.',
  },
  {
    title: 'Final Price Confirmed',
    description: 'We measure actual volume loaded. You only pay for space used - often less than the estimate!',
  },
];

const volumeGuide = [
  { item: 'Standard Couch', volume: '1.5-2 cubic yards' },
  { item: 'Queen Mattress & Box Spring', volume: '2-2.5 cubic yards' },
  { item: 'Refrigerator', volume: '1.5-2.5 cubic yards' },
  { item: 'Washer/Dryer Set', volume: '2.5-3 cubic yards' },
  { item: 'Office Desk', volume: '1-1.5 cubic yards' },
  { item: 'Dining Table + 4 Chairs', volume: '2-3 cubic yards' },
  { item: 'Hot Tub', volume: '4-6 cubic yards' },
  { item: 'Yard Waste (pickup truck load)', volume: '3-4 cubic yards' },
];

const ecoPartners = [
  { icon: '🏪', name: 'Habitat ReStore' },
  { icon: '👕', name: 'Goodwill' },
  { icon: '♻️', name: 'Treasure Valley Recycling' },
  { icon: '🏭', name: 'Ada County Landfill' },
  { icon: '📱', name: 'E-Waste Recyclers' },
  { icon: '🪑', name: 'Furniture Banks' },
  { icon: '🎁', name: 'Local Charities' },
  { icon: '🌲', name: 'Wood Recycling' },
];

const serviceAreas = [
  {
    city: 'Boise',
    details: 'North End, Bench, Downtown, Foothills - all neighborhoods served with same-day availability',
  },
  {
    city: 'Meridian',
    details: 'Linder, Eagle Rd corridor, Southeast Meridian. HOA-compliant service with documentation',
  },
  {
    city: 'Eagle',
    details: 'Gated communities welcome. Experienced with luxury home estate cleanouts and staging',
  },
  {
    city: 'Nampa',
    details: 'Fast service for growing Nampa. New construction debris specialists',
  },
  {
    city: 'Caldwell',
    details: 'Commercial and residential. Agricultural property cleanouts available',
  },
  {
    city: 'Kuna',
    details: 'Rural access no problem. Large property and acreage cleanouts',
  },
  {
    city: 'Star',
    details: 'Serving Star and Middleton communities. Barn and outbuilding cleanouts',
  },
  {
    city: 'Garden City',
    details: 'Industrial and commercial specialists. Quick turnaround for businesses',
  },
];

const testimonials = [
  {
    quote: 'The team was incredibly professional and respectful of our property. They removed our old hot tub and cleaned up so well you\'d never know it was there. Highly recommend!',
    name: 'Sarah Mitchell',
    location: 'Eagle, ID',
  },
  {
    quote: 'Best junk removal service we\'ve used. They were on time, worked quickly, and even donated items we didn\'t know could be donated. Great local business!',
    name: 'Mike Thompson',
    location: 'Meridian, ID',
  },
  {
    quote: 'We needed a full estate cleanout for my parents\' home. The team was compassionate, efficient, and handled everything with care. Worth every penny.',
    name: 'Jennifer Rodriguez',
    location: 'Boise, ID',
  },
];
