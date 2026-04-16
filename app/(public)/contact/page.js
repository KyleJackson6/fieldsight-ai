"use client";

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#0a0f0d] text-gray-100 font-sans">
      {/* Header Section */}
      <section className="relative px-6 pt-24 pb-16 md:pt-32 md:pb-20 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-white">
          Contact FieldSight AI
        </h1>
        <p className="mt-6 text-lg md:text-xl leading-relaxed text-gray-300 font-medium max-w-2xl mx-auto">
          Ready to optimize your yield and protect your land? Have a question about how our AI models work for your specific crops? Reach out to our team of agricultural experts today.
        </p>
      </section>

      {/* Main Content Grid */}
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            
            {/* Left Column: Contact Information */}
            <div className="flex flex-col gap-10 bg-[#0d1612] p-8 md:p-12 rounded-2xl border border-emerald-900/40 shadow-sm">
              <h2 className="text-2xl font-bold text-white mb-2">Get in touch</h2>
              <p className="text-gray-400 mb-4">We usually respond to all inquiries within 24 hours.</p>

              <div className="flex items-center gap-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-900/50 text-emerald-400 shrink-0">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-400">Email</p>
                  <a href="mailto:info@fieldsightai.com" className="text-lg font-medium text-white hover:text-emerald-300 transition-colors">info@fieldsightai.com</a>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-900/50 text-emerald-400 shrink-0">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.864-1.048l-3.281-.546c-.463-.077-.956.192-1.114.635l-.9 2.52c-2.435-1.46-4.423-3.448-5.883-5.882l2.519-.9c.443-.158.712-.65.635-1.114l-.545-3.281C13.716 2.601 13.266 2.25 12.75 2.25H9.5a2.25 2.25 0 00-2.25 2.25v.14c0 2.871.912 5.542 2.477 7.822z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-400">Phone</p>
                  <a href="tel:+15551234567" className="text-lg font-medium text-white hover:text-emerald-300 transition-colors">(555) 123-4567</a>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-900/50 text-emerald-400 shrink-0">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-400">Location</p>
                  <p className="text-lg font-medium text-white">Ontario, Canada</p>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="bg-[#0d1612] p-8 md:p-12 rounded-2xl border border-emerald-900/40 shadow-sm flex flex-col justify-center">
              <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full rounded-lg border-0 bg-[#15241d] px-4 py-3 text-white shadow-sm ring-1 ring-inset ring-emerald-900/50 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6 placeholder:text-gray-500 transition-all outline-none"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full rounded-lg border-0 bg-[#15241d] px-4 py-3 text-white shadow-sm ring-1 ring-inset ring-emerald-900/50 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6 placeholder:text-gray-500 transition-all outline-none"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    className="block w-full rounded-lg border-0 bg-[#15241d] px-4 py-3 text-white shadow-sm ring-1 ring-inset ring-emerald-900/50 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6 placeholder:text-gray-500 transition-all outline-none resize-none"
                    placeholder="How can we help your farm today?"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 block w-full rounded-lg bg-emerald-600 px-8 py-3.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}