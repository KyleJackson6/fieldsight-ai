"use client";

import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout, isLoaded } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-900/30 bg-[#0a0f0d]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <div className="flex flex-1 items-center gap-2">
          <svg className="h-8 w-8 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
          </svg>
          <a href="/" className="text-xl font-bold tracking-tight text-white transition-colors hover:text-emerald-400">
            FieldSight AI
          </a>
        </div>

        <nav className="hidden md:flex flex-1 items-center justify-center gap-8">
          <a href="/" className="text-sm font-semibold text-gray-300 transition-colors hover:text-emerald-400">Home</a>
          <a href="/analyze" className="text-sm font-semibold text-gray-300 transition-colors hover:text-emerald-400">Analyze</a>
          <a href="/reports" className="text-sm font-semibold text-gray-300 transition-colors hover:text-emerald-400">Reports</a>
          <a href="/about" className="text-sm font-semibold text-gray-300 transition-colors hover:text-emerald-400">About</a>
          <a href="/services" className="text-sm font-semibold text-gray-300 transition-colors hover:text-emerald-400">Services</a>
        </nav>

        <div className="flex flex-1 justify-end items-center gap-6">
          {isLoaded && user ? (
            <>
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-semibold text-emerald-400">{user.name}</span>
              </div>
              <button
                onClick={logout}
                className="rounded-full bg-red-600/10 px-4 py-2 text-sm font-bold text-red-500 ring-1 ring-inset ring-red-600/20 hover:bg-red-600/20 transition-all cursor-pointer"
              >
                Log Out
              </button>
            </>
          ) : isLoaded && !user ? (
            <>
              <a
                href="/login"
                className="text-sm font-semibold text-gray-300 transition-colors hover:text-emerald-400 cursor-pointer"
              >
                Log In
              </a>
              <a
                href="/signup"
                className="rounded-full bg-emerald-600/10 px-4 py-2 text-sm font-bold text-emerald-500 ring-1 ring-inset ring-emerald-600/20 hover:bg-emerald-600/20 transition-all cursor-pointer"
              >
                Sign Up
              </a>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}
