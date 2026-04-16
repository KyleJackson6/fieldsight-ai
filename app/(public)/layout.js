import Navbar from "@/components/Navbar";

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>

      <footer className="border-t border-emerald-900/30 bg-[#070b09] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between gap-10">
            {/* Brand and Tagline */}
            <div className="flex flex-col max-w-sm">
              <div className="flex items-center gap-2 mb-4">
                <svg
                  className="h-6 w-6 text-emerald-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>
                <span className="text-xl font-bold text-white tracking-tight">
                  FieldSight AI
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Empowering modern agriculture through precise, AI-powered aerial
                analysis. Prevent hidden yield loss with early detection.
              </p>
            </div>

            {/* Footer Links */}
            <div className="flex gap-8 sm:gap-16">
              <div className="flex flex-col gap-3">
                <span className="text-sm font-semibold text-white">Company</span>
                <a
                  href="/about"
                  className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  About Us
                </a>
                <a
                  href="/services"
                  className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  Services
                </a>
                <a
                  href="/contact"
                  className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  Contact
                </a>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-sm font-semibold text-white">Legal</span>
                <a
                  href="/privacy"
                  className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms"
                  className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 border-t border-emerald-900/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} FieldSight AI. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              Built for the future of farming{" "}
              <span className="text-emerald-500">🌱</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
