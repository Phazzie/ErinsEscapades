import React from 'react';

export default function DayToggle({ activeDay, setActiveDay }) {
  return (
    <div className="flex justify-center mb-8">
      <div className="relative bg-gray-800 rounded-full p-1 w-72 mx-auto flex items-center shadow-lg">
        <button onClick={() => setActiveDay('today')} className={`w-1/2 rounded-full p-2 text-lg font-semibold transition-all duration-300 z-10 ${activeDay === 'today' ? 'text-gray-900' : 'text-gray-400 hover:bg-gray-700'}`}>Today</button>
        <button onClick={() => setActiveDay('tomorrow')} className={`w-1/2 rounded-full p-2 text-lg font-semibold transition-all duration-300 z-10 ${activeDay === 'tomorrow' ? 'text-gray-900' : 'text-gray-400 hover:bg-gray-700'}`}>Tomorrow</button>
        <div className={`absolute top-1 h-10 bg-cyan-400 rounded-full transition-all duration-500 ease-in-out ${activeDay === 'today' ? 'transform translate-x-0' : 'transform translate-x-full'}`} style={{width: 'calc(50% - 4px)', margin: '0 2px', boxShadow: '0 0 15px rgba(6, 182, 212, 0.8)'}}></div>
      </div>
    </div>
  );
}
