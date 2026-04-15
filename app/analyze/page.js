"use client";

import { useState } from "react";
import AnalysisModeToggle from "../../components/AnalysisModeToggle";
import SinglePhotoUploadPanel from "../../components/SinglePhotoUploadPanel";
import BulkDatasetUploadPanel from "../../components/BulkDatasetUploadPanel";

export default function AnalyzePage() {
  const [mode, setMode] = useState("single"); // 'single' | 'bulk'

  return (
    <div className="bg-[#0a0f0d] text-gray-100 font-sans min-h-screen">
      <section className="relative px-6 py-20 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
          Field Analysis
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Upload individual drone imagery or process a full field dataset.
        </p>
      </section>
      
      <section className="pb-24 sm:pb-32 relative">
        <div className="mx-auto px-6 lg:px-8">
          <AnalysisModeToggle mode={mode} setMode={setMode} />
          
          {mode === "single" ? (
            <SinglePhotoUploadPanel />
          ) : (
            <BulkDatasetUploadPanel />
          )}
        </div>
      </section>
    </div>
  );
}
