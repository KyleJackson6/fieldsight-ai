"use client";

import { useState } from "react";
import ResultCard from "./ResultCard";
import { runRealInference, simulateSingleAnalysis } from "../lib/mockAnalysis";
import { useAuth } from "../hooks/useAuth";
import { saveReportImages } from "../lib/storage";

export default function SinglePhotoUploadPanel() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState(null);
  const { user } = useAuth();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setIsUploading(true);
    setResult(null);

    // Validate size (e.g. max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("File is too large. Please upload an image under 10MB.");
      setIsUploading(false);
      return;
    }

    try {
      const realResult = await runRealInference(file);
      
      const generatedId = "REP-" + Math.floor(Math.random() * 8999 + 1000);
      const storageKey = user ? `fieldSight_scans_${user.email}` : "fieldSight_scans_guest";
      const activeScans = JSON.parse(localStorage.getItem(storageKey) || "[]");
      
      const dataForStorage = {
        ...realResult,
        annotatedImage: null // stripping out for local storage
      };

      const newScan = {
        id: generatedId,
        date: new Date().toLocaleDateString(),
        status: "Current",
        type: "Single Analysis",
        affectedArea: realResult.waterDetected ? 1.0 : 0.0,
        severity: realResult.severity,
        images: 1,
        recommendation: realResult.recommendation,
        metrics: dataForStorage
      };

      const updatedScans = [newScan, ...activeScans.map(scan => ({ ...scan, status: "Archived" }))];
      
      try {
        localStorage.setItem(storageKey, JSON.stringify(updatedScans));
      } catch (e) {
        console.warn("Could not save single scan to local storage", e);
      }

      if (realResult.waterDetected) {
        saveReportImages(generatedId, [{
           id: 1,
           severity: realResult.severity,
           conf: realResult.confidence,
           annotatedImage: realResult.annotatedImage,
           fileName: file.name
        }]);
      }

      setResult(realResult);
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Real inference failed. Error: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in duration-300">
      {/* Upload Box */}
      <div className="rounded-2xl border border-emerald-900/40 bg-[#0d1612] p-8 shadow-sm text-center">
        {!preview ? (
          <div className="border-2 border-dashed border-emerald-900/50 rounded-xl p-12 hover:border-emerald-500/50 transition-colors">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <p className="text-gray-300 font-medium mb-2">Drag and drop a single field image here</p>
            <p className="text-sm text-gray-500 mb-6">High-resolution drone photos recommended</p>
            <label className="cursor-pointer rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 transition-colors inline-block">
              Select Photo
              <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative h-64 md:h-96 w-full rounded-xl overflow-hidden border border-emerald-900/40 bg-[#070b09]">
              <img src={preview} alt="Preview" className="object-cover w-full h-full" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <label className="cursor-pointer rounded-lg border border-emerald-600 px-6 py-2.5 text-sm font-semibold text-emerald-400 hover:bg-emerald-600 hover:text-white transition-colors text-center inline-flex items-center">
                Change Photo
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
              <button
                onClick={handleAnalyze}
                disabled={isUploading}
                className="rounded-lg bg-emerald-600 px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isUploading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </>
                ) : (
                  "Analyze Photo"
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {result && <ResultCard result={result} preview={preview} />}
    </div>
  );
}
