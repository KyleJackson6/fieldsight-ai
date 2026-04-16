"use client";

import HeatmapViewer from "@/components/HeatmapViewer";
import { mockHeatmapData, formatPercent } from "@/lib/mockAnalysis";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReportDetailPage() {
  const params = useParams();
  const id = params.id;
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("fieldSight_scans") || "[]");
    const found = saved.find(r => r.id === id);
    if (found) {
      setReportData(found);
    } else {
      // Fallback
      setReportData({
        affectedArea: 0.15,
        severity: "Elevated",
        metrics: { estimatedDryingTime: "4 Days" },
        recommendation: "Immediate attention required in the indicated zones. Deep blue pools show heavy accumulation."
      });
    }
  }, [id]);

  if (!reportData) return <div className="min-h-screen bg-[#0a0f0d]"></div>;

  return (
    <div className="bg-[#0a0f0d] text-gray-100 font-sans min-h-screen animate-in fade-in duration-500">
      <section className="relative px-6 py-20 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
          Detailed Visualization
        </h1>
        <p className="text-lg text-emerald-400 max-w-2xl mx-auto font-mono tracking-widest uppercase bg-emerald-900/20 inline-block px-4 py-1 rounded-full border border-emerald-500/20">
          REPORT ID: {id}
        </p>
      </section>
      
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <HeatmapViewer data={mockHeatmapData} />
            </div>
            
            <div className="lg:col-span-1 space-y-6">
              <a href="/reports" className="w-full text-center block text-sm font-semibold text-gray-400 hover:text-emerald-400 transition-colors mb-6 border border-emerald-900/40 rounded-lg py-3 hover:bg-[#111c17]">
                 &larr; Back to Archive
              </a>

              <div className="bg-[#0d1612] border border-emerald-900/40 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-white mb-6 border-b border-emerald-900/40 pb-3">Scan Context</h3>
                
                <div className="space-y-5">
                  <div>
                     <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Affected Area</p>
                     <p className="text-xl font-bold text-emerald-400">{formatPercent(reportData.affectedArea)}</p>
                  </div>
                  <div>
                     <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Avg Severity</p>
                     <p className="text-xl font-bold text-yellow-500">{reportData.severity}</p>
                  </div>
                  <div>
                     <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Drying Time</p>
                     <p className="text-xl font-bold text-white">{reportData.metrics?.estimatedDryingTime || "3-5 Days"}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#111c17] border border-emerald-900/30 rounded-xl p-6 shadow-sm">
                 <h3 className="text-sm font-bold text-white mb-3 tracking-wide">Analysis Notes</h3>
                 <p className="text-sm text-gray-400 leading-relaxed">
                   {reportData.recommendation}
                 </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
