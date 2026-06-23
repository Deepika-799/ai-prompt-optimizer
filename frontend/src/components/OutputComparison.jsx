export default function OutputComparison({ result }) {
  if (!result) return null;

  const evaluation = result.evaluation || null;

  const totalA = evaluation ? 
    (evaluation.clarityA || 0) + (evaluation.depthA || 0) + (evaluation.structureA || 0) + (evaluation.accuracyA || 0) : 0;
  const totalB = evaluation ? 
    (evaluation.clarityB || 0) + (evaluation.depthB || 0) + (evaluation.structureB || 0) + (evaluation.accuracyB || 0) : 0;

  // Compute winner from totals (primary), fallback to LLM if invalid
  let computedWinner = 'TIE';
  if (!isNaN(totalA) && !isNaN(totalB)) {
    if (totalA > totalB) {
      computedWinner = 'A';
    } else if (totalB > totalA) {
      computedWinner = 'B';
    }
  } else {
    computedWinner = evaluation?.winner || 'A';
  }

  const isWinnerA = computedWinner === 'A';
  const isTie = computedWinner === 'TIE';
  const winnerLabel = computedWinner === 'A' ? 'Output A (Original)' : 
                      computedWinner === 'B' ? 'Output B (Optimized)' : 
                      'Tie - Scores Equal';

  return (
    <div className="space-y-6">
      {/* 1. Original Prompt Section */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-100 px-6 py-3 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-700">Original Prompt</h2>
        </div>
        <div className="p-5">
          <p className="text-gray-700 leading-relaxed">{result.originalPrompt || "N/A"}</p>
        </div>
      </section>

      {/* 2. Optimized Prompt Section */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-100 px-6 py-3 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-700">Optimized Prompt</h2>
        </div>
        <div className="p-5">
          <p className="text-gray-700 leading-relaxed">{result.optimizedPrompt || "N/A"}</p>
        </div>
      </section>

      {/* 3 & 4. Output A and Output B - Side by Side Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Output A (Original) */}
        <section className={`bg-white rounded-lg shadow-sm border-2 overflow-hidden ${isWinnerA ? 'border-slate-500 ring-2 ring-slate-200' : 'border-gray-200'}`}>
          <div className={`px-5 py-3 border-b ${isWinnerA ? 'bg-slate-100 border-slate-300' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-700">Output A (Original)</h2>
              {isWinnerA && (
                <span className="px-3 py-1 bg-slate-700 text-white text-xs font-bold rounded-full shadow-sm">
                  WINNER
                </span>
              )}
            </div>
          </div>
          <div className="p-5 max-h-80 overflow-y-auto">
            <div className="text-gray-700 whitespace-pre-wrap leading-relaxed text-sm">{result.outputA || "No output generated"}</div>
          </div>
        </section>

        {/* Output B (Optimized) */}
        <section className={`bg-white rounded-lg shadow-sm border-2 overflow-hidden ${!isWinnerA && !isTie ? 'border-slate-500 ring-2 ring-slate-200' : 'border-gray-200'}`}>
          <div className={`px-5 py-3 border-b ${(!isWinnerA && !isTie) ? 'bg-slate-100 border-slate-300' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-700">Output B (Optimized)</h2>
              {!isWinnerA && !isTie && (
                <span className="px-3 py-1 bg-slate-700 text-white text-xs font-bold rounded-full shadow-sm">
                  WINNER
                </span>
              )}
            </div>
          </div>
          <div className="p-5 max-h-80 overflow-y-auto">
            <div className="text-gray-700 whitespace-pre-wrap leading-relaxed text-sm">{result.outputB || "No output generated"}</div>
          </div>
        </section>
      </div>

      {/* 5. Evaluation Scorecard Table */}
      {evaluation && (
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-100 px-6 py-3 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-700">Evaluation Scorecard</h2>
          </div>
          <div className="p-5">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Metric</th>
                    <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Original</th>
                    <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Optimized</th>
                    <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Diff</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { name: 'Clarity', a: evaluation.clarityA || 0, b: evaluation.clarityB || 0 },
                    { name: 'Depth', a: evaluation.depthA || 0, b: evaluation.depthB || 0 },
                    { name: 'Structure', a: evaluation.structureA || 0, b: evaluation.structureB || 0 },
                    { name: 'Accuracy', a: evaluation.accuracyA || 0, b: evaluation.accuracyB || 0 },
                  ].map((metric, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-700">{metric.name}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded text-sm font-medium ${metric.a > metric.b ? 'bg-slate-200 text-slate-700' : metric.a < metric.b ? 'bg-gray-200 text-gray-600' : 'bg-gray-100 text-gray-500'}`}>
                          {metric.a}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded text-sm font-medium ${metric.b > metric.a ? 'bg-slate-200 text-slate-700' : metric.b < metric.a ? 'bg-gray-200 text-gray-600' : 'bg-gray-100 text-gray-500'}`}>
                          {metric.b}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`text-xs font-medium ${metric.b > metric.a ? 'text-slate-600' : metric.b < metric.a ? 'text-gray-500' : 'text-gray-300'}`}>
                          {metric.b - metric.a > 0 ? '+' : ''}{metric.b - metric.a}
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm font-bold text-gray-800">Total</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center justify-center w-10 h-10 rounded text-sm font-bold ${totalA > totalB ? 'bg-slate-700 text-white' : totalA < totalB ? 'bg-gray-200 text-gray-600' : 'bg-gray-100 text-gray-500'}`}>
                        {totalA}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center justify-center w-10 h-10 rounded text-sm font-bold ${totalB > totalA ? 'bg-slate-700 text-white' : totalB < totalA ? 'bg-gray-200 text-gray-600' : 'bg-gray-100 text-gray-500'}`}>
                        {totalB}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-sm font-bold ${totalB > totalA ? 'text-slate-600' : totalB < totalA ? 'text-gray-500' : 'text-gray-300'}`}>
                        {totalB - totalA > 0 ? '+' : ''}{totalB - totalA}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* 6. Winner and Reason */}
      {evaluation && (
        <section className={`rounded-lg shadow-sm border overflow-hidden ${isTie ? 'bg-yellow-50 border-yellow-200' : 'bg-slate-50 border-slate-200'}`}>
          <div className={`px-6 py-3 border-b ${isTie ? 'bg-yellow-100 border-yellow-300' : 'bg-slate-100 border-slate-200'}`}>
            <h2 className={`text-base font-semibold ${isTie ? 'text-yellow-800' : 'text-gray-700'}`}>Final Verdict</h2>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-2xl ${isTie ? 'text-yellow-500' : 'text-slate-600'}`}>
                {isTie ? '⚖️' : '🏆'}
              </span>
              <div>
                <p className={`text-lg font-bold ${isTie ? 'text-yellow-900' : 'text-gray-900'}`}>
                  {winnerLabel}
                </p>
                <p className={`text-xs ${isTie ? 'text-yellow-700' : 'text-gray-500'}`}>
                  {isTie ? '' : 'wins this comparison'}
                </p>
              </div>
            </div>
            <div className="bg-white rounded border border-gray-200 p-4">
              <p className="text-xs text-gray-400 mb-1 font-medium uppercase">Reason</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                {computedWinner === 'TIE' ? evaluation.reason || 'Scores are perfectly balanced between Original and Optimized outputs.' : evaluation.reason || 'No reason provided'}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

