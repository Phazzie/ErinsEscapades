import React from 'react';

export default function CommentsAndActions({ comments, setComments, mailtoLink, onAddTask }) {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl shadow-2xl border border-pink-500/20">
        <h2 className="text-xl font-semibold mb-3 text-pink-400 text-glow-accent">Comments or Clarifying Questions</h2>
        <textarea value={comments} onChange={(e) => setComments(e.target.value)} placeholder="Add any additional notes here..." className="w-full h-32 p-3 bg-gray-900/50 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 border border-transparent focus:border-pink-500 transition-all"></textarea>
      </div>
      <div className="bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl shadow-2xl border border-cyan-500/20 flex flex-col justify-around items-center">
        <button onClick={onAddTask} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 mb-4 button-glow-blue">Add Task</button>
        <a href={mailtoLink} className="w-full text-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 button-glow-green">Submit</a>
      </div>
    </div>
  );
}
