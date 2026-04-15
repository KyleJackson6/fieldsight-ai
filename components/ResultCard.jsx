export default function ResultCard({ result, preview }) {
  return (
    <div className="rounded-2xl border border-emerald-900/40 bg-[#0d1612] p-8 shadow-sm">
      <h3 className="text-2xl font-bold text-white mb-6 border-b border-emerald-900/40 pb-4">Analysis Result</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-[#111c17] border border-emerald-900/30 p-5">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Water Detected</p>
              <p className={`text-xl font-bold ${result.waterDetected ? 'text-emerald-400' : 'text-gray-300'}`}>
                {result.waterDetected ? 'Yes' : 'No'}
              </p>
            </div>
            
            <div className="rounded-xl bg-[#111c17] border border-emerald-900/30 p-5">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Confidence</p>
              <div className="flex items-end gap-2">
                <p className="text-xl font-bold text-white">
                  {(result.confidence * 100).toFixed(0)}%
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-[#111c17] border border-emerald-900/30 p-5 col-span-2">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Severity / Risk</p>
              <p className={`text-xl font-bold ${result.severity === 'High' ? 'text-red-400' : 'text-yellow-400'}`}>
                {result.severity}
              </p>
            </div>

            <div className="rounded-xl bg-[#0a0f0d] border border-emerald-900/40 p-5 col-span-2">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Recommendation</p>
              <p className="text-sm text-gray-300 leading-relaxed font-medium">
                {result.recommendation}
              </p>
            </div>
          </div>
        </div>

        <div className="relative h-64 md:h-full min-h-[300px] rounded-xl overflow-hidden border border-emerald-900/40 bg-[#070b09]">
          {/* Base Image */}
          {preview && (
            <img src={preview} alt="Original" className="absolute inset-0 object-cover w-full h-full opacity-60 grayscale-[30%]" />
          )}
          
          {/* Overlay Image (Placeholder) */}
          {result.waterDetected && (
            <div className="absolute inset-0 pointer-events-none mix-blend-screen">
               {/* simulated heat zones */}
               <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-cyan-400 rounded-full blur-[40px] opacity-70"></div>
               <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-500 rounded-full blur-[40px] opacity-60"></div>
               <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-indigo-500 rounded-full blur-[30px] opacity-70"></div>
            </div>
          )}
          
          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md border border-emerald-900/50 px-3 py-1.5 rounded-lg flex items-center justify-center gap-2">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
             <p className="text-xs text-emerald-400 font-mono tracking-wider">HEATMAP OVERLAY ON</p>
          </div>
        </div>
      </div>
    </div>
  );
}
