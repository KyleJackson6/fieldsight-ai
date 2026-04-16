"use client";

import { useAuth } from "../hooks/useAuth";
import { useState, useRef, useEffect } from "react";

export default function DashboardNavbar() {
  const { user, logout, isLoaded } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-900/30 bg-[#0a0f0d]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <div className="flex flex-1 items-center gap-2">
          <svg className="h-8 w-8 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
          </svg>
          <a href="/" className="text-xl font-bold tracking-tight text-white transition-colors hover:text-emerald-400">
            FieldSight <span className="text-gray-400 font-medium">Dashboard</span>
          </a>
        </div>

        <nav className="hidden md:flex flex-1 items-center justify-center gap-8">
          <a href="/analyze" className="text-sm font-semibold text-gray-300 transition-colors hover:text-emerald-400">New Scan</a>
          <a href="/reports" className="text-sm font-semibold text-gray-300 transition-colors hover:text-emerald-400">My Reports</a>
        </nav>

        <div className="flex flex-1 justify-end items-center gap-6">
          {isLoaded && user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 p-1.5 pr-3 rounded-full hover:bg-emerald-900/20 transition-colors border border-transparent hover:border-emerald-900/50"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-900/40 flex items-center justify-center text-emerald-400 font-bold text-sm border border-emerald-500/20">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:flex flex-col items-start mr-1">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold pb-0.5 leading-none">Logged In</span>
                  <span className="text-sm font-semibold text-emerald-400 leading-none">{user.name.split(' ')[0]}</span>
                </div>
                <svg className={`w-4 h-4 text-emerald-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 rounded-xl border border-emerald-900/50 bg-[#0d1612] p-2 shadow-xl shadow-emerald-900/10 flex flex-col gap-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-3 py-2 mb-2 border-b border-emerald-900/30">
                    <p className="text-sm font-bold text-white truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  
                  <a href="/account" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-emerald-900/40 transition-colors">
                    <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings & Account
                  </a>
                  
                  <a href="/subscriptions" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-emerald-900/40 transition-colors">
                    <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Billing & Subscriptions
                  </a>
                  
                  <div className="h-px bg-emerald-900/30 my-1 w-full"></div>
                  
                  <button
                    onClick={() => { setDropdownOpen(false); logout(); }}
                    className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors text-left"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : isLoaded && !user ? (
            <a
              href="/login"
              className="text-sm font-semibold text-gray-300 transition-colors hover:text-emerald-400 cursor-pointer"
            >
              Session Expired (Log In)
            </a>
          ) : null}
        </div>
      </div>
    </header>
  );
}
