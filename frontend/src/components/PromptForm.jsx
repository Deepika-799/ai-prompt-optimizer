import { useState } from "react";
import axios from "axios";

export default function PromptForm({ setResult, setLoading }) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/optimize", {
        prompt,
      });
      setResult(res.data);
    } catch (err) {
      const errorMessage = err.response?.data?.details || err.response?.data?.error || err.message;
      alert("Error: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-slate-800 px-6 py-4">
        <h2 className="text-xl font-bold text-white">Enter Your Prompt</h2>
        <p className="text-slate-300 text-sm mt-1">We'll optimize it and compare the results</p>
      </div>
      <div className="p-6">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Example: Explain JWT authentication in simple terms..."
          className="w-full h-32 p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none text-gray-700 placeholder-gray-400"
        />
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-500">Press Ctrl+Enter to submit</p>
          <button 
            onClick={handleSubmit}
            disabled={!prompt.trim()}
            className="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-all font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Optimize & Compare
          </button>
        </div>
      </div>
    </div>
  );
}

