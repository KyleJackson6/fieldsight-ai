"use client";

import { useState } from "react";
import { formatPercent } from "../lib/mockAnalysis";
import { useAuth } from "../hooks/useAuth";

export default function FieldSummaryDashboard({ result }) {
  const [emailStatus, setEmailStatus] = useState("idle"); // idle, loading, success, error
  const { user, isLoaded } = useAuth();

  const handleSendReport = async () => {
    if (!user || !user.email) {
      setEmailStatus("error");
      setTimeout(() => setEmailStatus("idle"), 5000);
      return;
    }
    
    setEmailStatus("loading");
    try {
      const response = await fetch("/api/email-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
           name: user.name, 
           email: user.email,
           report: {
              id: result.reportId || "Unknown",
              images: result.totalProcessed,
              severity: result.riskLevel,
              affectedArea: result.affectedPercentage,
              recommendation: result.recommendation,
              date: result.timestamp
           }
        }),
      });
      if (response.ok) {
        setEmailStatus("success");
        setTimeout(() => setEmailStatus("idle"), 5000);
      } else {
        setEmailStatus("error");
        setTimeout(() => setEmailStatus("idle"), 5000);
      }
    } catch (error) {
      setEmailStatus("error");
      setTimeout(() => setEmailStatus("idle"), 5000);
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-500">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Metric Cards */}
        <div className="bg-[#0d1612] border border-emerald-900/40 rounded-xl p-6">
          <p className="text-sm text-gray-400 mb-1">Processed</p>
          <p className="text-2xl font-bold text-white">{result.totalProcessed} Images</p>
        </div>
        <div className="bg-[#0d1612] border border-emerald-900/40 rounded-xl p-6">
          <p className="text-sm text-gray-400 mb-1">Affected Area</p>
          <p className="text-2xl font-bold text-emerald-400">{formatPercent(result.affectedPercentage)}</p>
        </div>
        <div className="bg-[#0d1612] border border-emerald-900/40 rounded-xl p-6">
          <p className="text-sm text-gray-400 mb-1">Risk Level</p>
          <p className="text-2xl font-bold text-yellow-500">{result.riskLevel}</p>
        </div>
        <div className="bg-[#0d1612] border border-emerald-900/40 rounded-xl p-6">
          <p className="text-sm text-gray-400 mb-1">Drying Time</p>
          <p className="text-2xl font-bold text-white">{result.estimatedDryingTime}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0d1612] border border-emerald-900/40 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-4">Analysis Recommendation</h3>
            <p className="text-gray-300 leading-relaxed mb-6">{result.recommendation}</p>
            <div className="border-t border-emerald-900/40 pt-4 flex justify-between items-center text-sm">
              <span className="text-gray-500">Report generated: {result.timestamp}</span>
              <span className="text-emerald-500 font-medium tracking-wide border border-emerald-900/50 bg-emerald-900/20 px-3 py-1 rounded-full">Automated FieldSight Scan</span>
            </div>
          </div>
          
          {/* Flagged Images */}
          <div className="bg-[#0d1612] border border-emerald-900/40 rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-white mb-6 flex justify-between items-center">
              Flagged Sectors 
              <span className="bg-red-500/10 text-red-400 px-3 py-1 text-sm rounded-full border border-red-500/20">{result.flaggedImagesCount} Images</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {result.flaggedImages.map(img => (
                <div key={img.id} className="relative group rounded-xl overflow-hidden border border-emerald-900/40 bg-[#070b09] aspect-square">
                  <img src={img.annotatedImage || "/window.svg"} className="absolute inset-0 w-full h-full object-cover" alt={`Flagged ${img.id}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 z-10">
                    <p className={`text-xs font-bold ${img.severity === 'High' ? 'text-red-400' : 'text-yellow-400'}`}>{img.severity} Severity</p>
                    <p className="text-[10px] text-gray-400 font-mono tracking-wider mt-0.5">CONF: {img.conf.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-[#111c17] border border-emerald-600/30 rounded-2xl p-8 shadow-lg shadow-emerald-900/10 h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-emerald-600/20 rounded-full flex items-center justify-center mb-6 border border-emerald-500/30">
               <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
               </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Send Field Report</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">Email the comprehensive analysis summary to your registered contacts using our secure template system.</p>
            
            <button 
              onClick={handleSendReport}
              disabled={emailStatus === 'loading' || !isLoaded || !user}
              className="w-full rounded-lg bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {emailStatus === 'loading' ? 'Sending...' : 'Email Analysis Summary'}
            </button>
            {emailStatus === 'success' && <p className="mt-4 text-emerald-400 text-sm animate-pulse font-medium">Email sent to {user?.email}!</p>}
            {emailStatus === 'error' && <p className="mt-4 text-red-400 text-sm font-medium">Error sending. Ensure you are logged in.</p>}
            {!user && isLoaded && <p className="mt-4 text-yellow-500 text-sm font-medium">Log in to enable email reporting.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
