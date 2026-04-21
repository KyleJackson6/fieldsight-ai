"use client";

import { useState } from "react";
import FieldSummaryDashboard from "./FieldSummaryDashboard";
import { runRealBulkInference, simulateBulkAnalysis } from "../lib/mockAnalysis";
import { useAuth } from "../hooks/useAuth";
import { saveReportImages } from "../lib/storage";

export default function BulkDatasetUploadPanel() {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const { user } = useAuth();
  
  const handleFilesChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = Array.from(e.target.files);
      setFiles(selected);
      setDashboardData(null);
    }
  };

  const handleAnalyze = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    try {
      const data = await runRealBulkInference(files);
      
      const generatedId = "REP-" + Math.floor(Math.random() * 8999 + 1000);
      const storageKey = user ? `fieldSight_scans_${user.email}` : "fieldSight_scans_guest";
      const activeScans = JSON.parse(localStorage.getItem(storageKey) || "[]");
      
      // Strip large base64 images before putting in local storage to prevent QuotaExceededError
      const dataForStorage = {
        ...data,
        flaggedImages: data.flaggedImages.map(img => {
          const { annotatedImage, ...rest } = img;
          return rest;
        })
      };

      const newScan = {
        id: generatedId,
        date: new Date().toLocaleDateString(),
        status: "Current",
        type: "Bulk Analysis",
        affectedArea: data.affectedPercentage,
        severity: data.riskLevel,
        images: data.totalProcessed,
        recommendation: data.recommendation,
        metrics: dataForStorage 
      };
      
      const updatedScans = [newScan, ...activeScans.map(scan => ({ ...scan, status: "Archived" }))];
      
      try {
        localStorage.setItem(storageKey, JSON.stringify(updatedScans));
      } catch (e) {
        console.warn("Could not save to localStorage, it might be full even after stripping images.", e);
      }

      // Persist the large generated heavy images to IndexedDB asynchronously
      saveReportImages(generatedId, data.flaggedImages);

      setDashboardData({ ...data, reportId: generatedId });
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in zoom-in duration-300">
      {!dashboardData ? (
        <div className="rounded-2xl border border-emerald-900/40 bg-[#0d1612] p-8 shadow-sm text-center min-h-[400px] flex flex-col justify-center items-center">
            <div className="border-2 border-dashed border-emerald-900/50 rounded-xl p-16 hover:border-emerald-500/50 transition-colors w-full relative">
              <svg className="mx-auto h-16 w-16 text-gray-400 mb-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
              </svg>
              <h3 className="text-xl text-gray-200 font-bold mb-2">Upload Bulk Dataset</h3>
              {files.length === 0 ? (
                <>
                  <p className="text-gray-400 font-medium mb-8">Drag and drop your dataset folder or multiple images here</p>
                  <label className="cursor-pointer rounded-lg bg-emerald-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 transition-colors inline-block z-10 relative">
                    Select Images
                    <input type="file" multiple className="hidden" accept="image/*" onChange={handleFilesChange} />
                  </label>
                </>
              ) : (
                <div className="space-y-6">
                  <p className="text-emerald-400 font-medium text-lg">{files.length} images selected ready for scan</p>
                  <div className="flex gap-4 justify-center items-center">
                    <label className="cursor-pointer text-sm text-gray-500 hover:text-emerald-400 underline underline-offset-4 tracking-wide transition-colors">
                      Change Files
                      <input type="file" multiple className="hidden" accept="image/*" onChange={handleFilesChange} />
                    </label>
                    <button
                      onClick={handleAnalyze}
                      disabled={isProcessing}
                      className="rounded-lg bg-emerald-600 px-10 py-3.5 text-base font-bold text-white shadow-sm hover:bg-emerald-500 transition-all disabled:opacity-50 disabled:scale-100 active:scale-95 flex items-center gap-3"
                    >
                      {isProcessing ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing Dataset...
                        </>
                      ) : "Run Field Scan"}
                    </button>
                  </div>
                </div>
              )}
            </div>
        </div>
      ) : (
        <FieldSummaryDashboard result={dashboardData} />
      )}
    </div>
  );
}
