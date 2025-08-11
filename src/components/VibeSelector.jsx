import React from 'react';

export default function VibeSelector({ sessionData, currentVibe, isOwner, onSelect, onRename, onDelete }) {
  if (!sessionData) return null;
  return (
    <div className="mb-8 p-4 bg-gray-800/80 rounded-xl shadow-lg border border-cyan-500/20">
      <h2 className="text-center text-xl font-semibold mb-3 text-cyan-400">Change the Vibe</h2>
      <div className="flex justify-center flex-wrap gap-3">
        {Object.keys(sessionData.vibes).map(vibeName => (
          <div key={vibeName} className="flex items-center group">
            <button onClick={() => onSelect(vibeName)} className={`font-bold py-2 px-4 rounded-l-lg transition-transform transform hover:scale-105 ${currentVibe === vibeName ? 'bg-cyan-500 text-white' : 'bg-gray-600 hover:bg-gray-500 text-white'}`}>{vibeName.charAt(0).toUpperCase() + vibeName.slice(1).replace(/([A-Z])|_/g, ' $1').trim()}</button>
            {isOwner && (
              <div className="flex">
                <button onClick={() => onRename(vibeName)} className="bg-gray-500 hover:bg-yellow-500 p-2 transition-colors opacity-50 group-hover:opacity-100">✏️</button>
                <button onClick={() => onDelete(vibeName)} className="bg-gray-500 hover:bg-red-500 p-2 rounded-r-lg transition-colors opacity-50 group-hover:opacity-100">🗑️</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
