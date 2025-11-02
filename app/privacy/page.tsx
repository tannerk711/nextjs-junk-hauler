import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 mb-8"
        >
          ← Back to Home
        </Link>

        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-6">
          Privacy Policy
        </h1>

        <p className="text-sm text-slate-600 mb-8">
          Last Updated: November 1, 2025
        </p>

        <div className="prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Introduction</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Junk Yard Gentlemen ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services, including our AI-powered quote system.
            </p>
            <p className="text-slate-700 leading-relaxed">
              By using our website and services, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. Information We Collect</h2>

            <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">2.1 Personal Information You Provide</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              When you request a quote or contact us, we collect:
            </p>
            <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-2">
              <li><strong>Contact Information:</strong> Name, email address, phone number, and physical address</li>
              <li><strong>Photos:</strong> Images of junk/items you want removed, uploaded through our quote system</li>
              <li><strong>Additional Notes:</strong> Any optional information you provide about your junk removal needs</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">2.2 Automatically Collected Information</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              When you visit our website, we may automatically collect:
            </p>
            <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-2">
              <li><strong>Usage Data:</strong> Pages visited, time spent on pages, and navigation patterns</li>
              <li><strong>Device Information:</strong> Browser type, operating system, and device identifiers</li>
              <li><strong>IP Address:</strong> Your Internet Protocol address for security and analytics purposes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-2">
              <li><strong>Quote Generation:</strong> Processing your photos through our AI system (powered by Anthropic Claude) to provide volume estimates and pricing</li>
              <li><strong>Service Delivery:</strong> Scheduling junk removal services and communicating with you</li>
              <li><strong>Customer Support:</strong> Responding to inquiries and providing assistance</li>
              <li><strong>Business Operations:</strong> Managing our CRM system and internal records</li>
              <li><strong>Legal Compliance:</strong> Meeting legal and regulatory requirements</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Third-Party Services</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We use the following third-party services to operate our business:
            </p>

            <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">4.1 Cloudinary</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Photos you upload are stored and processed by Cloudinary, a cloud-based image management service. Cloudinary processes images in accordance with their privacy policy available at{' '}
              <a href="https://cloudinary.com/privacy" className="text-blue-600 hover:text-blue-500">https://cloudinary.com/privacy</a>
            </p>

            <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">4.2 Anthropic Claude AI</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Your photos and notes are analyzed by Anthropic's Claude AI to generate volume estimates. Anthropic processes this data in accordance with their privacy policy available at{' '}
              <a href="https://www.anthropic.com/privacy" className="text-blue-600 hover:text-blue-500">https://www.anthropic.com/privacy</a>
            </p>

            <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">4.3 Go High Level (via Zapier)</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Your contact information and quote details are sent to our CRM system (Go High Level) via Zapier webhooks for lead management and follow-up communications.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">4.4 Vercel</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Our website is hosted on Vercel, which may collect standard web server logs and analytics data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Data Security</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information, including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-2">
              <li>Encrypted data transmission (HTTPS/SSL)</li>
              <li>Secure server infrastructure</li>
              <li>Access controls and authentication</li>
              <li>Regular security audits and updates</li>
            </ul>
            <p className="text-slate-700 leading-relaxed">
              However, no method of transmission over the Internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Data Retention</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We retain your personal information only for as long as necessary to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-2">
              <li>Provide our services to you</li>
              <li>Comply with legal obligations (typically 7 years for business records)</li>
              <li>Resolve disputes and enforce our agreements</li>
            </ul>
            <p className="text-slate-700 leading-relaxed">
              Photos uploaded for quotes are typically retained for 90 days unless you request earlier deletion.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Your Privacy Rights</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-2">
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
              <li><strong>Data Portability:</strong> Receive your data in a structured, machine-readable format</li>
            </ul>
            <p className="text-slate-700 leading-relaxed">
              To exercise these rights, please contact us using the information in Section 11.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">8. California Privacy Rights (CCPA)</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):
            </p>
            <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-2">
              <li>Right to know what personal information is collected, used, shared, or sold</li>
              <li>Right to delete personal information</li>
              <li>Right to opt-out of the sale of personal information (we do not sell your information)</li>
              <li>Right to non-discrimination for exercising your CCPA rights</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">9. Children's Privacy</h2>
            <p className="text-slate-700 leading-relaxed">
              Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">10. Changes to This Privacy Policy</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date. We encourage you to review this Privacy Policy periodically.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Continued use of our services after changes are posted constitutes acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">11. Contact Us</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact us:
            </p>
            <div className="bg-slate-50 rounded-lg p-6 mb-4">
              <p className="font-semibold text-slate-900 mb-2">Junk Yard Gentlemen</p>
              <p className="text-slate-700">Phone: <a href="tel:+18445435865" className="text-blue-600 hover:text-blue-500">(844) 543-JUNK</a></p>
              <p className="text-slate-700">Email: privacy@junkyardgentlemen.com</p>
              <p className="text-slate-700 mt-2">Address: Boise, Idaho</p>
            </div>
            <p className="text-slate-700 leading-relaxed">
              We will respond to your inquiry within 30 days.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">12. Consent</h2>
            <p className="text-slate-700 leading-relaxed">
              By using our website and services, you consent to our Privacy Policy and agree to its terms. If you do not agree with this policy, please do not use our services.
            </p>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="flex justify-center gap-8 text-sm text-slate-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/quote" className="hover:text-blue-600">Get Quote</Link>
            <Link href="/privacy" className="font-semibold text-slate-900">Privacy Policy</Link>
          </div>
          <p className="text-center text-sm text-slate-600 mt-4">
            &copy; 2025 Junk Yard Gentlemen. Licensed and Insured.
          </p>
        </div>
      </footer>
    </div>
  );
}
