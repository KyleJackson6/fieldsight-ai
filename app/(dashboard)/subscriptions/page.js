"use client";

import { useAuth } from "@/hooks/useAuth";

export default function SubscriptionsPage() {
  const { user, isLoaded } = useAuth();

  if (isLoaded && !user) return null;

  return (
    <div className="min-h-screen bg-[#0a0f0d] text-white px-6 py-16 animate-in fade-in zoom-in duration-300">
      <div className="max-w-4xl mx-auto space-y-10">
        
        <header className="border-b border-emerald-900/40 pb-6">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">Billing & Subscriptions</h1>
          <p className="text-gray-400 text-lg">Manage your commercial farming plans and field credits.</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-[#0d1612] to-[#111c17] border border-emerald-500/30 rounded-2xl p-8 shadow-lg shadow-emerald-900/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 py-1.5 px-5 bg-emerald-500 text-[#0a0f0d] font-bold text-xs uppercase tracking-widest rounded-bl-xl">
                 Active Plan
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-1">Early Access Program</h2>
              <p className="text-emerald-400 font-medium mb-6">Free unlimited scanning during beta.</p>
              
              <div className="space-y-4 mb-8">
                 <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Unlimited Multi-Image Batch Analysis</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">High Resolution TIFF Drone imagery</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Priority Support & Early Features</span>
                 </div>
              </div>

              <button className="px-6 py-3 rounded-lg border border-emerald-500 text-emerald-400 font-bold hover:bg-emerald-900/30 transition-colors">
                 Manage Billing via Stripe
              </button>
           </div>
           
           <div className="col-span-1 bg-[#0d1612] border border-emerald-900/40 rounded-2xl p-6 flex flex-col justify-center">
              <h3 className="text-sm text-gray-500 uppercase tracking-widest font-semibold mb-4 text-center">Monthly Usage Check</h3>
              
              <div className="flex justify-center mb-4">
                 <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-4 border-emerald-900/30 border-t-emerald-500">
                    <div className="text-center">
                       <span className="text-3xl font-bold text-white block">12</span>
                       <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Scans</span>
                    </div>
                 </div>
              </div>
              
              <p className="text-center text-sm text-gray-400">
                 You have <span className="text-white font-bold">12</span> scans this month.
              </p>
           </div>
        </section>

      </div>
    </div>
  );
}
