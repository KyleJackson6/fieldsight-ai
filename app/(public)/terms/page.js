export default function TermsPage() {
  return (
    <div className="bg-[#0a0f0d] min-h-screen text-gray-100 font-sans pb-24">
      {/* Header */}
      <div className="pt-24 pb-12 px-6 border-b border-emerald-900/30 bg-[#070b09]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-emerald-900/30 text-emerald-400 ring-1 ring-inset ring-emerald-500/30">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-emerald-400">
            Last updated: April 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 pt-16">
        <div className="rounded-2xl border border-emerald-900/40 bg-[#0d1612] p-8 md:p-12 shadow-sm">
          <p className="text-lg text-gray-300 leading-relaxed mb-10">
            Welcome to FieldSight AI. These Terms of Service govern your use of our website and services.
            By accessing or using FieldSight AI, you agree to these terms.
          </p>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 hidden sm:block"></span>
                About the Service
              </h2>
              <p className="text-gray-400 leading-relaxed">
                FieldSight AI provides AI-powered agricultural analysis tools, including field monitoring,
                drainage detection, crop health insights, and automated report-style recommendations for farmers
                and agricultural users.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 hidden sm:block"></span>
                Acceptable Use
              </h2>
              <p className="text-gray-400 leading-relaxed">
                You agree to use FieldSight AI only for lawful purposes. You must not misuse the platform,
                attempt unauthorized access, interfere with system operation, or use the service in a way that
                harms other users or the business.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 hidden sm:block"></span>
                Intellectual Property
              </h2>
              <p className="text-gray-400 leading-relaxed">
                All branding, website content, design elements, and software related to FieldSight AI remain
                the property of FieldSight AI unless otherwise stated. Users retain ownership of the data they
                submit, but grant FieldSight AI permission to process that data to provide the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 hidden sm:block"></span>
                Limitation of Liability
              </h2>
              <p className="text-gray-400 leading-relaxed">
                FieldSight AI provides analytical insights to support agricultural decision-making, but does not
                guarantee specific farming outcomes, yields, or business results. Users are responsible for how
                they interpret and apply the insights provided by the platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 hidden sm:block"></span>
                Termination
              </h2>
              <p className="text-gray-400 leading-relaxed">
                We may suspend or terminate access to the service if a user violates these terms, misuses the
                platform, or engages in unlawful or abusive behavior.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 hidden sm:block"></span>
                Legal Frameworks
              </h2>
              <p className="text-gray-400 leading-relaxed">
                FieldSight AI operates with consideration for Canadian privacy obligations under PIPEDA.
                Because the platform may also be accessed by users outside Canada, GDPR principles may also
                apply where relevant. If email communications are used for business updates or notifications,
                CASL considerations may also be relevant in the Canadian context.
              </p>
            </section>

            <section className="bg-[#111c17] border border-emerald-900/50 rounded-xl p-6 mt-8">
              <h2 className="text-xl font-bold text-white mb-3">Contact Us</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                If you have questions about these Terms of Service, please contact FieldSight AI through the
                website contact page.
              </p>
              <a href="/contact" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                Go to Contact Page
                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}