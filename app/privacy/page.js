export default function PrivacyPage() {
  return (
    <div className="bg-[#0a0f0d] min-h-screen text-gray-100 font-sans pb-24">
      {/* Header */}
      <div className="pt-24 pb-12 px-6 border-b border-emerald-900/30 bg-[#070b09]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-emerald-900/30 text-emerald-400 ring-1 ring-inset ring-emerald-500/30">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Privacy Policy
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
            FieldSight AI respects user privacy and is committed to protecting personal
            information. This Privacy Policy explains what data we collect, how it is
            used, and how it is protected.
          </p>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 hidden sm:block"></span>
                What Data We Collect
              </h2>
              <div className="text-gray-400 leading-relaxed space-y-4">
                <p>
                  We may collect personal information such as your name and email address when
                  you sign up, submit a contact request, or interact with email features on the
                  platform.
                </p>
                <p>
                  We also collect Google Analytics 4 data, which may include page views, session
                  activity, approximate location, device information, browser information, and
                  general usage patterns through cookies and similar technologies.
                </p>
                <p>
                  In addition, FieldSight AI may store business-related data in its database,
                  including field information, analysis reports, issue detections, and contact
                  request details entered by users.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 hidden sm:block"></span>
                How Data Is Used
              </h2>
              <p className="text-gray-400 leading-relaxed">
                We use personal and usage data to operate the platform, provide AI-powered
                field insights, send transactional emails, respond to inquiries, improve user
                experience, and analyze website performance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 hidden sm:block"></span>
                Cookies and Analytics
              </h2>
              <p className="text-gray-400 leading-relaxed">
                FieldSight AI uses Google Analytics 4, which relies on cookies and similar
                technologies to collect information about how visitors use the website. This
                helps us understand traffic patterns, user engagement, and which pages are most
                useful.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 hidden sm:block"></span>
                Storage and Protection
              </h2>
              <p className="text-gray-400 leading-relaxed">
                We take reasonable steps to protect personal and business data using controlled
                access, secure development practices, and reputable hosting and software tools.
                However, no method of electronic storage or transmission is completely secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 hidden sm:block"></span>
                User Rights
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Users may request access to their personal information, ask for corrections, or
                request deletion of their data where applicable. Privacy-related questions can
                be submitted through the website contact page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 hidden sm:block"></span>
                Legal Compliance
              </h2>
              <p className="text-gray-400 leading-relaxed">
                FieldSight AI considers Canadian privacy obligations under PIPEDA. GDPR
                principles may also apply where relevant if the service is accessed by users in
                the European Union.
              </p>
            </section>

            <section className="bg-[#111c17] border border-emerald-900/50 rounded-xl p-6 mt-8">
              <h2 className="text-xl font-bold text-white mb-3">Contact Us</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                If you have questions or concerns about this Privacy Policy, please contact
                FieldSight AI through our website contact page.
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