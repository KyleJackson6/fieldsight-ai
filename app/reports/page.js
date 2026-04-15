"use client";

import { useAuth } from "../../hooks/useAuth";
import { formatPercent } from "../../lib/mockAnalysis";

const recentReports = [
  {
    id: "REP-9921",
    date: new Date().toLocaleDateString(),
    status: "Current",
    affectedArea: 0.12,
    severity: "High",
    images: 120,
    recommendation: "Monitor drainage in the northeastern quadrant. Field visualization mapping updated."
  },
  {
    id: "REP-9804",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    status: "Archived",
    affectedArea: 0.08,
    severity: "Medium",
    images: 110,
    recommendation: "Minor pooling expected to resolve naturally over the next 48 hours."
  },
  {
    id: "REP-9712",
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    status: "Archived",
    affectedArea: 0.05,
    severity: "Low",
    images: 115,
    recommendation: "Standard conditions across the surveyed zones. No immediate action required."
  }
];

export default function ReportsPage() {
  const { user, isLoaded } = useAuth();
  
  if (isLoaded && !user) {
    return (
      <div className="min-h-screen bg-[#0a0f0d] flex items-center justify-center text-white p-6">
        <div className="text-center bg-[#0d1612] border border-emerald-900/40 p-10 rounded-2xl max-w-md shadow-lg shadow-emerald-900/5">
           <svg className="w-16 h-16 text-emerald-500 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
           </svg>
           <h2 className="text-2xl font-bold mb-3">Access Restricted</h2>
           <p className="text-gray-400 mb-8 text-sm">You must be logged in to access secure analysis reports.</p>
           <a href="/login" className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold inline-block hover:bg-emerald-500 transition-colors w-full">Log In to View Reports</a>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0f0d] text-white px-6 py-16 animate-in fade-in zoom-in duration-300">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <header className="mb-12 border-b border-emerald-900/40 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-white">Your Field Reports</h1>
            <p className="text-gray-400 text-lg">Review and manage past comprehensive analysis scans.</p>
          </div>
          {user && (
            <div className="bg-[#0d1612] pl-3 pr-5 py-2.5 rounded-xl border border-emerald-900/30 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-900/40 flex items-center justify-center text-emerald-400 font-bold text-lg border border-emerald-500/20">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <p className="text-[11px] text-gray-500 uppercase tracking-widest font-semibold flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Authenticated</p>
                <p className="text-sm font-bold text-gray-200">{user.email}</p>
              </div>
            </div>
          )}
        </header>

        <h3 className="text-lg font-bold text-emerald-400 mb-4 tracking-wider">LATEST ANALYSIS</h3>
        {recentReports.filter(r => r.status === 'Current').map(report => (
          <div key={report.id} className="rounded-2xl border border-emerald-500/30 bg-[#0d1612] p-8 lg:p-10 shadow-lg shadow-emerald-900/10 mb-10 overflow-hidden relative">
            <div className="absolute top-0 right-0 py-2.5 px-6 bg-emerald-500/10 border-b border-l border-emerald-500/30 rounded-bl-xl text-emerald-400 font-bold text-xs uppercase tracking-widest">
              {report.status}
            </div>
            
            <div className="flex flex-col md:flex-row justify-between gap-8 mb-8 border-b border-emerald-900/30 pb-8 mt-2">
               <div>
                  <p className="text-gray-500 text-xs mb-1.5 uppercase tracking-widest font-semibold">Report ID</p>
                  <p className="text-xl font-mono font-bold text-white">{report.id}</p>
               </div>
               <div>
                  <p className="text-gray-500 text-xs mb-1.5 uppercase tracking-widest font-semibold">Generated</p>
                  <p className="text-xl font-medium text-white">{report.date}</p>
               </div>
               <div>
                  <p className="text-gray-500 text-xs mb-1.5 uppercase tracking-widest font-semibold">Images Processed</p>
                  <p className="text-xl font-bold text-white">{report.images}</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-[#111c17] p-6 rounded-xl border border-emerald-900/30">
                 <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2">Affected Area</p>
                 <p className="text-3xl font-bold text-red-400">{formatPercent(report.affectedArea)}</p>
               </div>
               <div className="bg-[#111c17] p-6 rounded-xl border border-emerald-900/30">
                 <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2">Overall Severity</p>
                 <p className="text-3xl font-bold text-yellow-500">{report.severity}</p>
               </div>
               <div className="bg-[#0a0f0d] p-6 rounded-xl border border-emerald-900/40">
                 <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2">Recommendation</p>
                 <p className="text-sm text-gray-300 leading-relaxed font-medium">{report.recommendation}</p>
               </div>
            </div>

            <div className="mt-10 pt-6 flex flex-col sm:flex-row justify-end gap-4 border-t border-emerald-900/30">
               <a href={`/reports/${report.id}`} className="px-8 py-3 rounded-lg border border-emerald-600/50 text-emerald-400 font-bold text-sm text-center hover:bg-emerald-600/10 transition-colors">View Map Visualization</a>
               <a href="/analyze" className="px-8 py-3 rounded-lg bg-emerald-600 text-white font-bold text-sm text-center hover:bg-emerald-500 transition-colors">Start New Scan</a>
            </div>
          </div>
        ))}

        <div className="mt-16 border-t border-emerald-900/30 pt-10">
          <h3 className="text-lg font-bold text-gray-400 mb-6 tracking-wider">REPORT HISTORY</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentReports.filter(r => r.status === 'Archived').map(report => (
              <div key={report.id} className="rounded-xl border border-emerald-900/30 bg-[#0d1612] p-6 hover:border-emerald-700/50 transition-colors cursor-pointer group flex flex-col justify-between min-h-[160px]">
                <div className="flex justify-between items-start mb-4">
                   <div>
                      <h4 className="text-white font-bold text-lg group-hover:text-emerald-400 transition-colors">{report.id}</h4>
                      <p className="text-gray-500 text-sm">{report.date}</p>
                   </div>
                   <span className="bg-[#111c17] text-gray-400 border border-emerald-900/50 text-[10px] font-bold px-2.5 py-1 uppercase rounded tracking-widest">{report.status}</span>
                </div>
                <div className="flex justify-between items-center bg-[#111c17] p-3.5 rounded-lg border border-emerald-900/30 opacity-80 group-hover:opacity-100 transition-opacity">
                   <div className="text-center flex-1">
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-0.5">Severity</p>
                      <p className={`font-bold ${report.severity === 'Medium' ? 'text-yellow-500' : 'text-emerald-500'}`}>{report.severity}</p>
                   </div>
                   <div className="w-px h-8 bg-emerald-900/30 mx-2"></div>
                   <div className="text-center flex-1">
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-0.5">Affected</p>
                      <p className="font-bold text-white">{formatPercent(report.affectedArea)}</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
