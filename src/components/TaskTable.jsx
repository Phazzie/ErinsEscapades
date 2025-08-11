import React, { useRef } from 'react';

export default function TaskTable({ tasks, onTaskTextChange, onChoiceChange, onRemoveTask, onReorder }) {
  const dragItem = useRef();
  const dragOverItem = useRef();

  const handleDragEnd = () => {
    const from = dragItem.current;
    const to = dragOverItem.current;
    if (from == null || to == null || from === to) return;
    onReorder(from, to);
    dragItem.current = null;
    dragOverItem.current = null;
  };

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-pink-500/20">
      <div className="grid grid-cols-10 gap-2 p-4 bg-gray-700/50 font-bold text-lg text-pink-400 text-left">
        <div className="col-span-5">Task</div>
        <div className="col-span-1 text-center">Yes</div>
        <div className="col-span-1 text-center">No</div>
        <div className="col-span-1 text-center">Maybe</div>
        <div className="col-span-2 text-center">Actions</div>
      </div>
      {tasks.map((task, index) => (
        <div key={task.id} draggable onDragStart={() => dragItem.current = index} onDragEnter={() => dragOverItem.current = index} onDragEnd={handleDragEnd} onDragOver={(e) => e.preventDefault()} className="grid grid-cols-10 gap-2 border-t border-pink-500/20 items-center p-2 hover:bg-pink-500/10 transition-colors duration-300 cursor-grab">
          <div className="col-span-5">
            <input type="text" value={task.text} onChange={(e) => onTaskTextChange(task.id, e.target.value)} className="bg-transparent w-full p-3 text-white placeholder-gray-500 focus:outline-none focus:bg-gray-900/50 rounded-md transition-all" />
          </div>
          <fieldset className="col-span-3 flex justify-center items-center gap-4" aria-label="Choice selection">
            <legend className="sr-only">Select choice</legend>
            {['yes', 'no', 'maybe'].map(choice => (
              <div key={choice} className="text-center flex flex-col items-center">
                <input
                  type="radio"
                  id={`choice-${task.id}-${choice}`}
                  name={`choice-${task.id}`}
                  checked={task.choice === choice}
                  onChange={() => onChoiceChange(task.id, choice)}
                  className="form-radio h-6 w-6 text-pink-400 bg-gray-900 border-gray-600 focus:ring-pink-400 focus:ring-offset-gray-800 transition-all duration-300"
                />
                <label htmlFor={`choice-${task.id}-${choice}`} className="mt-1 capitalize text-xs text-white">{choice}</label>
              </div>
            ))}
          </fieldset>
          <div className="col-span-2 text-center">
            <button onClick={() => onRemoveTask(task.id)} className="text-red-500 hover:text-red-400 font-bold py-2 px-4 rounded transition-colors hover:bg-red-500/10">Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}
