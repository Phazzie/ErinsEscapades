import React from 'react';

export default function AIGenerator({ isOwner, aiTheme, setAiTheme, isGenerating, onGenerate }) {
  if (!isOwner) return null;
  return (
    <div className="mb-8 p-4 bg-gray-800/80 rounded-xl shadow-lg border border-purple-500/30">
      <h2 className="text-center text-xl font-semibold mb-3 text-purple-400">Generate a New Vibe with AI</h2>
      <div className="flex flex-col sm:flex-row gap-3">
        <input type="text" value={aiTheme} onChange={(e) => setAiTheme(e.target.value)} placeholder="Enter a theme (e.g., spicy, chill, romantic)" className="flex-grow bg-gray-900/50 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
        <button onClick={onGenerate} disabled={isGenerating} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed">{isGenerating ? 'Generating...' : 'Generate'}</button>
      </div>
    </div>
  );
}
