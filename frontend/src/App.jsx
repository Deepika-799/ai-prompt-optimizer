import { useState } from "react";
import PromptForm from "./components/PromptForm";
import OutputComparison from "./components/OutputComparison";
import "./index.css";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-slate-800 text-white py-8 shadow-lg">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">✨</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Prompt Optimizer AI</h1>
              <p className="text-slate-400 text-sm mt-1">Enhance your prompts with AI-powered optimization</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        <PromptForm setResult={setResult} setLoading={setLoading} />

        {/* Loading State */}
        {loading && (
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <p className="text-gray-600 text-lg mt-6 font-medium">Processing your prompt...</p>
              <p className="text-gray-400 text-sm mt-2">This may take a few seconds</p>
            </div>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px flex-1 bg-gray-300"></div>
              <span className="text-gray-400 text-sm font-medium px-4">RESULTS</span>
              <div className="h-px flex-1 bg-gray-300"></div>
            </div>
            <OutputComparison result={result} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 py-6 text-center text-gray-400 text-sm">
        <p>Powered by AI • Compare original vs optimized outputs</p>
      </footer>
    </div>
  );
}

export default App;

