"use client";

import { useAuth } from "@/hooks/useAuth";
import { formatPercent } from "@/lib/mockAnalysis";
import { getReportImages, deleteReportImages } from "@/lib/storage";
import { useState, useEffect } from "react";

export default function ReportsPage() {
  const { user, isLoaded } = useAuth();
  const [recentReports, setRecentReports] = useState([]);
  const [activeModalReport, setActiveModalReport] = useState(null);
  const [reportToDelete, setReportToDelete] = useState(null);
  const [modalImages, setModalImages] = useState([]);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [emailStatuses, setEmailStatuses] = useState({});
  
  useEffect(() => {
    if (isLoaded) {
      const storageKey = user ? `fieldSight_scans_${user.email}` : "fieldSight_scans_guest";
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setRecentReports(JSON.parse(saved));
      }
    }
  }, [isLoaded, user]);

  const openImageGallery = async (reportId) => {
    setActiveModalReport(reportId);
    setIsModalLoading(true);
    const images = await getReportImages(reportId);
    setModalImages(images);
    setIsModalLoading(false);
  };

  const handleDeleteReport = (e, reportId) => {
    e.stopPropagation(); // prevent opening gallery
    setReportToDelete(reportId);
  };

  const confirmDeleteReport = async () => {
    if (!reportToDelete) return;

    // Filter out from local state
    const updatedReports = recentReports.filter(r => r.id !== reportToDelete);
    setRecentReports(updatedReports);

    // Save to localStorage
    const storageKey = user ? `fieldSight_scans_${user.email}` : "fieldSight_scans_guest";
    localStorage.setItem(storageKey, JSON.stringify(updatedReports));

    // Clear heavy assets from IndexedDB
    await deleteReportImages(reportToDelete);
    
    setReportToDelete(null);
  };

  const handleEmailReport = async (e, reportId) => {
    e.stopPropagation();
    if (!user || !user.email) return;

    const reportToEmail = recentReports.find(r => r.id === reportId);
    if (!reportToEmail) return;

    setEmailStatuses(prev => ({ ...prev, [reportId]: "loading" }));
    
    try {
      const response = await fetch("/api/email-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
           name: user.name, 
           email: user.email,
           report: reportToEmail
        }),
      });

      if (response.ok) {
         setEmailStatuses(prev => ({ ...prev, [reportId]: "success" }));
      } else {
         setEmailStatuses(prev => ({ ...prev, [reportId]: "idle" }));
         console.warn("Failed to send email");
      }
      
      setTimeout(() => {
         setEmailStatuses(prev => ({ ...prev, [reportId]: "idle" }));
      }, 4000);
    } catch (err) {
      console.error(err);
      setEmailStatuses(prev => ({ ...prev, [reportId]: "idle" }));
    }
  };

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

        {recentReports.filter(r => r.status === 'Current').length > 0 && (
          <h3 className="text-lg font-bold text-emerald-400 mb-4 tracking-wider">LATEST ANALYSIS</h3>
        )}
        
        {recentReports.filter(r => r.status === 'Current').map(report => (
          <div key={report.id} className="rounded-2xl border border-emerald-500/30 bg-[#0d1612] p-8 lg:p-10 shadow-lg shadow-emerald-900/10 mb-10 overflow-hidden relative">
            <div className="absolute top-0 right-0 py-2.5 px-6 bg-emerald-500/10 border-b border-l border-emerald-500/30 rounded-bl-xl text-emerald-400 font-bold text-xs uppercase tracking-widest">
              {report.status}
            </div>
            
            <div className="flex flex-col md:flex-row justify-between gap-8 mb-8 border-b border-emerald-900/30 pb-8 mt-2">
               <div>
                  <p className="text-gray-500 text-xs mb-1.5 uppercase tracking-widest font-semibold">Report ID</p>
                  <p className="text-xl font-mono font-bold text-white mb-2">{report.id}</p>
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-emerald-900/40 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full">
                    {report.type || (report.images === 1 ? 'Single Analysis' : 'Bulk Analysis')}
                  </span>
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
               <button 
                  onClick={(e) => handleEmailReport(e, report.id)} 
                  disabled={emailStatuses[report.id] === 'loading' || emailStatuses[report.id] === 'success'}
                  className={`px-8 py-3 rounded-lg border font-bold text-sm text-center transition-colors ${
                     emailStatuses[report.id] === 'success' 
                       ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                       : 'border-emerald-600/50 text-emerald-400 hover:bg-emerald-600/10'
                  }`}
               >
                  {emailStatuses[report.id] === 'loading' ? 'Sending...' : emailStatuses[report.id] === 'success' ? `Sent to ${user?.email}!` : 'Email Report'}
               </button>
               <button onClick={() => openImageGallery(report.id)} className="px-8 py-3 rounded-lg border border-emerald-600/50 text-emerald-400 font-bold text-sm text-center hover:bg-emerald-600/10 transition-colors">View Flagged Photos</button>
               <a href={`/reports/${report.id}`} className="px-8 py-3 rounded-lg border border-emerald-600/50 text-emerald-400 font-bold text-sm text-center hover:bg-emerald-600/10 transition-colors">View Map Visualization</a>
               <a href="/analyze" className="px-8 py-3 rounded-lg bg-emerald-600 text-white font-bold text-sm text-center hover:bg-emerald-500 transition-colors">Start New Scan</a>
            </div>
          </div>
        ))}

        <div className="mt-16 border-t border-emerald-900/30 pt-10">
          <h3 className="text-lg font-bold text-gray-400 mb-6 tracking-wider">REPORT HISTORY</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {recentReports.filter(r => r.status === 'Archived').map(report => (
              <div key={report.id} onClick={() => openImageGallery(report.id)} className="rounded-xl border border-emerald-900/30 bg-[#0d1612] p-6 hover:border-emerald-700/50 transition-colors cursor-pointer group flex flex-col justify-between min-h-[160px] relative overflow-hidden">
                <div className="absolute top-0 right-0 py-1.5 px-4 bg-[#111c17] rounded-bl-lg text-gray-500 group-hover:text-emerald-400 text-[10px] uppercase font-bold tracking-widest border-b border-l border-emerald-900/30 transition-colors">View Photos</div>
                
                {/* Actions Container */}
                <div className="absolute top-0 left-0 flex opacity-0 group-hover:opacity-100 transition-opacity bg-[#111c17] rounded-br-lg border-b border-r border-emerald-900/30 z-10 overflow-hidden">
                   {/* Email Button */}
                   <button 
                      onClick={(e) => handleEmailReport(e, report.id)}
                      className="p-2 text-gray-600 hover:text-emerald-400 hover:bg-[#0a0f0d] transition-colors border-r border-emerald-900/30"
                      title="Email Report"
                   >
                      {emailStatuses[report.id] === 'success' ? (
                         <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                         </svg>
                      ) : emailStatuses[report.id] === 'loading' ? (
                         <svg className="animate-spin w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24">
                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                         </svg>
                      ) : (
                         <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                         </svg>
                      )}
                   </button>

                   {/* Delete Button */}
                   <button 
                      onClick={(e) => handleDeleteReport(e, report.id)}
                      className="p-2 text-gray-600 hover:text-red-400 hover:bg-[#0a0f0d] transition-colors"
                      title="Delete Report"
                   >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                         <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                   </button>
                </div>

                <div className="flex justify-between items-start mb-4 mt-2">
                   <div className="pl-16 md:pl-0 flex flex-col items-start gap-1"> 
                      <h4 className="text-white font-bold text-lg group-hover:text-emerald-400 transition-colors">{report.id}</h4>
                      <p className="text-gray-500 text-sm">{report.date}</p>
                      <span className="mt-1 text-[9px] uppercase font-bold tracking-widest bg-emerald-900/20 text-emerald-500 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                        {report.type || (report.images === 1 ? 'Single Analysis' : 'Bulk Analysis')}
                      </span>
                   </div>
                   <span className="bg-[#111c17] text-gray-400 border border-emerald-900/50 text-[10px] font-bold px-2.5 py-1 uppercase rounded tracking-widest">{report.status}</span>
                </div>
                <div className="flex justify-between items-center bg-[#111c17] p-3.5 rounded-lg border border-emerald-900/30 opacity-80 group-hover:opacity-100 transition-opacity">
                   <div className="text-center flex-1">
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-0.5">Severity</p>
                      <p className={`font-bold ${report.severity === 'Medium' || report.severity === 'Elevated' ? 'text-yellow-500' : report.severity === 'High' ? 'text-red-400' : 'text-emerald-500'}`}>{report.severity}</p>
                   </div>
                   <div className="w-px h-8 bg-emerald-900/30 mx-2"></div>
                   <div className="text-center flex-1">
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-0.5">Affected</p>
                      <p className="font-bold text-white">{formatPercent(report.affectedArea)}</p>
                   </div>
                </div>
              </div>
            ))}
            
            {recentReports.filter(r => r.status === 'Archived').length === 0 && (
               <p className="text-gray-500 col-span-2 text-center py-6 border border-dashed border-emerald-900/30 rounded-xl">No historical records available.</p>
            )}
          </div>
        </div>
      </div>

      {/* Flagged Images Gallery Modal */}
      {activeModalReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0d1612] w-full max-w-5xl max-h-[90vh] rounded-2xl border border-emerald-900/50 shadow-2xl flex flex-col">
            <div className="p-6 border-b border-emerald-900/40 flex justify-between items-center bg-[#0a0f0d] rounded-t-2xl">
              <div>
                <h3 className="text-xl font-bold text-white">Detection Gallery</h3>
                <p className="text-sm text-gray-500 font-mono mt-1">Report ID: {activeModalReport}</p>
              </div>
              <button 
                onClick={() => setActiveModalReport(null)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-900/20 text-emerald-500 hover:bg-emerald-900/50 hover:text-white transition-colors"
                title="Close"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
              {isModalLoading ? (
                <div className="flex flex-col items-center justify-center h-64 text-emerald-500">
                  <svg className="animate-spin h-10 w-10 text-emerald-500 mb-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-sm font-semibold tracking-wider uppercase">Loading Heavy Assets...</p>
                </div>
              ) : modalImages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500 border-2 border-dashed border-emerald-900/30 rounded-xl">
                  <svg className="w-12 h-12 mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <p>No detection images found in local storage for this scan.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {modalImages.map((img, idx) => (
                    <div key={idx} className="bg-[#111c17] rounded-xl border border-emerald-900/40 p-4 shadow-xl">
                      <div className="aspect-[4/3] rounded-lg overflow-hidden bg-black mb-4 relative">
                         <img src={img.annotatedImage || "/window.svg"} alt="Pooling annotation" className="absolute inset-0 w-full h-full object-contain" />
                      </div>
                      <div className="flex justify-between items-center px-2">
                        <div>
                          <p className={`text-sm font-bold ${img.severity === 'High' ? 'text-red-400' : 'text-yellow-400'}`}>Severity: {img.severity}</p>
                          <p className="text-xs text-gray-500 font-mono tracking-widest mt-1">CONF: {img.conf.toFixed(2)}</p>
                        </div>
                        <span className="text-xs bg-[#0a0f0d] text-gray-400 px-3 py-1.5 rounded-full border border-emerald-900/30 line-clamp-1 max-w-[120px]" title={img.fileName}>
                           {img.fileName || "Image"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {reportToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-[#0d1612] w-full max-w-sm rounded-2xl border border-red-900/50 shadow-2xl shadow-red-900/10 overflow-hidden">
            <div className="p-6 bg-[#0a0f0d] border-b border-red-900/20 flex flex-col items-center text-center">
               <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4 border border-red-500/20">
                  <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
               </div>
               <h3 className="text-xl font-bold text-white mb-2">Delete Report</h3>
               <p className="text-gray-400 text-sm">Are you sure you want to permanently remove <span className="text-gray-200 font-mono font-bold tracking-tight">{reportToDelete}</span>? This action cannot be undone.</p>
            </div>
            <div className="p-4 flex gap-3 bg-[#0c120f] border-t border-[#111c17]">
               <button 
                 onClick={() => setReportToDelete(null)}
                 className="flex-1 py-2.5 rounded-lg border border-gray-600/30 text-gray-400 font-semibold text-sm hover:bg-gray-800 hover:text-white transition-colors"
               >
                 Cancel
               </button>
               <button 
                 onClick={confirmDeleteReport}
                 className="flex-1 py-2.5 rounded-lg bg-red-500/90 text-white font-bold text-sm shadow-sm hover:bg-red-500 transition-colors"
               >
                 Yes, Delete
               </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
