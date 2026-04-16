export default function Services() {
  return (
    <div className="min-h-screen bg-[#0a0f0d] text-gray-100 font-sans">
      {/* Header Section */}
      <section className="relative px-6 pt-24 pb-16 md:pt-32 md:pb-20 lg:px-8 max-w-7xl mx-auto">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-white">
            Our Services
          </h1>
          <p className="mt-6 text-lg md:text-xl leading-relaxed text-gray-300 font-medium max-w-xl mx-auto">
            Comprehensive aerial analytics powered by AI to give you a complete, actionable view of your fields entirely from above.
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
            {/* Service 1: AI Field Analysis */}
            <div className="group relative rounded-2xl border border-emerald-900/40 bg-[#0d1612] p-8 shadow-sm transition-all hover:border-emerald-500/50 hover:bg-[#111c17]">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-900/50 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">AI Field Analysis</h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                Process thousands of high-resolution aerial images through our machine learning models. We identify overall trends, establish agricultural baselines, and locate subtle variations that indicate potential issues across your entire acreage.
              </p>
            </div>

            {/* Service 2: Drainage Detection and Mapping */}
            <div className="group relative rounded-2xl border border-emerald-900/40 bg-[#0d1612] p-8 shadow-sm transition-all hover:border-emerald-500/50 hover:bg-[#111c17]">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-900/50 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Drainage Detection and Mapping</h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                Detect subsurface water flow, hidden pooling, and runoff patterns that damage crop root zones. We map precise topographical irregularities to guide your tiling improvements and irrigation adjustments before major yield loss occurs.
              </p>
            </div>

            {/* Service 3: Crop Health Monitoring */}
            <div className="group relative rounded-2xl border border-emerald-900/40 bg-[#0d1612] p-8 shadow-sm transition-all hover:border-emerald-500/50 hover:bg-[#111c17]">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-900/50 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Crop Health Monitoring</h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                Evaluate canopy coverage and plant vitality using infrared imaging parameters (NDVI). Our system reveals nutrient deficiencies, pest pressure, and disease indicators weeks before they present visual symptoms at ground level.
              </p>
            </div>

            {/* Service 4: Automated Field Reports */}
            <div className="group relative rounded-2xl border border-emerald-900/40 bg-[#0d1612] p-8 shadow-sm transition-all hover:border-emerald-500/50 hover:bg-[#111c17]">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-900/50 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Automated Field Reports</h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                Receive customized, actionable PDF and digital reports following every flight. We consolidate complex analysis into straightforward dashboards showing exactly where to direct your scouts and inputs for the highest return on investment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}