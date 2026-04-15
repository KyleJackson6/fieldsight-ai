export default function HeatmapViewer({ data }) {
  return (
    <div className="relative w-full aspect-video md:h-[600px] bg-[#0d1612] border border-emerald-900/40 rounded-2xl overflow-hidden shadow-sm flex items-center justify-center">
      {/* Actual field image from the project */}
      <img src="/field/field-overview.png" alt="Field Overview" className="absolute inset-0 w-full h-full object-cover opacity-80" />
      
      {/* Grid overlay for technical vibe */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      {/* Heatmap Overlays */}
      <div className="absolute inset-0 pointer-events-none mix-blend-screen overflow-hidden">
        {data.map((point, index) => {
          const color = point.intensity > 0.7 ? "bg-cyan-400" : point.intensity > 0.4 ? "bg-blue-500" : "bg-indigo-600";
          const size = Math.max(120, point.intensity * 300);
          return (
            <div
              key={index}
              className={`absolute rounded-full blur-[40px] ${color}`}
              style={{
                left: `${point.x}px`,
                top: `${point.y}px`,
                width: `${size}px`,
                height: `${size}px`,
                opacity: point.intensity * 0.7,
                transform: 'translate(-50%, -50%)'
              }}
            />
          );
        })}
      </div>
      
      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md border border-emerald-900/50 px-3 py-1.5 rounded-lg flex items-center gap-2">
         <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
         <p className="text-xs text-emerald-400 font-mono tracking-wider">LIVE MOCK SIMULATION</p>
      </div>
    </div>
  );
}
