"use client";

import { useAuth } from "../hooks/useAuth";

export default function HomeHeroCTA() {
  const { user, isLoaded } = useAuth();

  // Prevents UI flickering/hydration errors by rendering a skeleton while checking auth state
  if (!isLoaded) {
    return (
      <div className="rounded-lg bg-emerald-600/20 shadow-sm animate-pulse w-[130px] h-[52px]"></div>
    );
  }

  // User is logged in
  if (user) {
    return (
      <a
        href="/analyze"
        className="rounded-lg bg-emerald-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-emerald-500 transition-colors"
      >
        Go to Dashboard
      </a>
    );
  }

  // Not logged in
  return (
    <a
      href="/signup"
      className="rounded-lg bg-emerald-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-emerald-500 transition-colors"
    >
      Sign Up
    </a>
  );
}
