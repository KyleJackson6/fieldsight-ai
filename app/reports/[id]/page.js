"use client";

import HeatmapViewer from "../../../components/HeatmapViewer";
import { mockHeatmapData } from "../../../lib/mockAnalysis";
import { useParams } from "next/navigation";

export default function ReportDetailPage() {
  const params = useParams();
  const id = params.id;

  const summaryMetrics = {
    affectedArea: "15%",
    avgSeverity: "Medium-High",
    dryingTime: "4 Days",
    riskLevel: "Elevated"
  };

  return (
    <div className="bg-[#0a0f0d] text-gray-100 font-sans min-h-screen">
      <section className="relative px-6 py-20 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
          Detailed Visualization
        </h1>
        <p className="text-lg text-emerald-400 max-w-2xl mx-auto font-mono tracking-widest uppercase">
          REPORT: {id}
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
                <h3 className="text-lg font-bold text-white mb-6 border-b border-emerald-900/40 pb-3">Field Metrics</h3>
                
                <div className="space-y-5">
                  <div>
                     <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Affected Area</p>
                     <p className="text-xl font-bold text-emerald-400">{summaryMetrics.affectedArea}</p>
                  </div>
                  <div>
                     <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Avg Severity</p>
                     <p className="text-xl font-bold text-yellow-500">{summaryMetrics.avgSeverity}</p>
                  </div>
                  <div>
                     <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Risk Level</p>
                     <p className="text-xl font-bold text-red-400">{summaryMetrics.riskLevel}</p>
                  </div>
                  <div>
                     <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Drying Time</p>
                     <p className="text-xl font-bold text-white">{summaryMetrics.dryingTime}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#111c17] border border-emerald-900/30 rounded-xl p-6 shadow-sm">
                 <h3 className="text-sm font-bold text-white mb-2">Recommendation</h3>
                 <p className="text-sm text-gray-400 leading-relaxed">
                   Immediate attention required in the high severity zones indicated by red clusters. Consider deep tilling if dry conditions persist.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
