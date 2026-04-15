export default function AnalysisModeToggle({ mode, setMode }) {
  return (
    <div className="flex justify-center mb-12">
      <div className="bg-[#0d1612] p-1.5 rounded-xl border border-emerald-900/40 inline-flex shadow-sm">
        <button
          onClick={() => setMode('single')}
          className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            mode === 'single'
              ? 'bg-emerald-600/20 text-emerald-400 ring-1 ring-emerald-500/50 shadow-sm'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Single Photo
        </button>
        <button
          onClick={() => setMode('bulk')}
          className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            mode === 'bulk'
              ? 'bg-emerald-600/20 text-emerald-400 ring-1 ring-emerald-500/50 shadow-sm'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Bulk Dataset
        </button>
      </div>
    </div>
  );
}
