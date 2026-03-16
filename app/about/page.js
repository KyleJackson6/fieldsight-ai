export default function About() {
  return (
    <div className="min-h-screen bg-[#0a0f0d] text-gray-100 font-sans">
      {/* Header / Mission Section */}
      <section className="relative px-6 py-24 md:py-32 lg:px-8 max-w-7xl mx-auto">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-white">
            About FieldSight AI
          </h1>
          <p className="mt-4 text-xl leading-8 text-emerald-400 font-medium">
            Empowering Modern Agriculture with Artificial Intelligence
          </p>
          <p className="mt-8 text-lg leading-relaxed text-gray-300">
            FieldSight AI was created to help farmers better understand their fields using artificial intelligence and aerial imagery. By analyzing drone and satellite images, our platform detects patterns related to drainage issues, soil variation, and crop health long before they become visible to the naked eye. We turn complex data into actionable insights so you can protect your yield and farm more efficiently.
          </p>
        </div>
      </section>

      {/* 3-Card Section: Mission, Vision, Value */}
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Card 1: Mission */}
            <div className="rounded-2xl border border-emerald-900/50 bg-[#0d1612] p-8 shadow-sm transition-all hover:border-emerald-500/30 hover:shadow-emerald-900/20">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-900/50">
                <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
              <p className="text-gray-400 leading-relaxed">
                To equip farmers with precise, early-warning detection systems for drainage issues and crop stress, turning reactive farming into proactive land management.
              </p>
            </div>

            {/* Card 2: Vision */}
            <div className="rounded-2xl border border-emerald-900/50 bg-[#0d1612] p-8 shadow-sm transition-all hover:border-emerald-500/30 hover:shadow-emerald-900/20">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-900/50">
                <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Our Vision</h3>
              <p className="text-gray-400 leading-relaxed">
                A future where every acre of farmland reaches its maximum potential through sustainable, data-driven agriculture and accessible AI technology.
              </p>
            </div>

            {/* Card 3: Value */}
            <div className="rounded-2xl border border-emerald-900/50 bg-[#0d1612] p-8 shadow-sm transition-all hover:border-emerald-500/30 hover:shadow-emerald-900/20">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-900/50">
                <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Core Value</h3>
              <p className="text-gray-400 leading-relaxed">
                We believe in practical innovation. We don't just provide raw numbers and thermal arrays; we deliver clear, reliable answers that save farmers time and money.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}