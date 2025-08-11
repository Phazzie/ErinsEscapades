import React, { useEffect, useState } from 'react';
import { auth, provider } from './lib/firebase';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { useSession } from './hooks/useSession';

import AuthControls from './components/AuthControls';
import DayToggle from './components/DayToggle';
import VibeSelector from './components/VibeSelector';
import TaskTable from './components/TaskTable';
import CommentsAndActions from './components/CommentsAndActions';
// import AIGenerator from './components/AIGenerator'; // Hidden for now

export default function App() {
  const [user, setUser] = useState(null);
  const [sessionId, setSessionId] = useState('');
  const [activeDay, setActiveDay] = useState('today');
  const [comments, setComments] = useState('');
  const [mailtoLink, setMailtoLink] = useState('');
  const [shareableLink, setShareableLink] = useState('');
  // AI generation temporarily disabled
  // const [aiTheme, setAiTheme] = useState('');
  // const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('session');
    if (!id) id = Math.random().toString(36).substring(2, 9);
    setSessionId(id);
    const newUrl = `${window.location.origin}${window.location.pathname}?session=${id}`;
    setShareableLink(newUrl);
  }, []);

  const { sessionData, setSessionData, currentVibe, setCurrentVibe, isLoading, saveError, isSaving } = useSession(sessionId, user);

  useEffect(() => {
    if (!sessionData) return;
    const tasks = sessionData.vibes[currentVibe] || [];
    const taskResults = tasks.map(task => `  - ${task.text}: ${task.choice ? task.choice.toUpperCase() : 'Not Answered'}`).join('\n');
    const subject = `Erin's Escapades: Response for ${activeDay.charAt(0).toUpperCase() + activeDay.slice(1)}`;
    const body = `Hi!\n\nHere are the results for the "${activeDay}" plan:\n\n${taskResults}\n\n--- Comments or Clarifying Questions ---\n${comments}\n\n`;
    const link = `mailto:fxomov@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setMailtoLink(link);
  }, [sessionData, currentVibe, comments, activeDay]);

  const isOwner = user && sessionData && user.uid === sessionData.owner;

  const handleSignIn = () => signInWithPopup(auth, provider).catch(console.error);
  const handleSignOut = () => signOut(auth).catch(console.error);
  const handleListChange = (v) => setCurrentVibe(v);

  const handleRenameVibe = (oldName) => {
    const newName = prompt(`Rename the vibe "${oldName}":`);
    if (!newName) return;
    const trimmed = newName.trim();
    if (trimmed === '' || trimmed === oldName) return;
    const newVibeKey = trimmed.toLowerCase().replace(/\s+/g, '_');
    setSessionData(prev => {
      if (prev.vibes[newVibeKey] && newVibeKey !== oldName) {
        alert('A vibe with that name already exists. Choose another name.');
        return prev; // no change
      }
      const newVibes = { ...prev.vibes };
      newVibes[newVibeKey] = newVibes[oldName];
      if (newVibeKey !== oldName) delete newVibes[oldName];
      return { ...prev, vibes: newVibes, currentVibe: newVibeKey };
    });
  };

  const handleDeleteVibe = (vibeName) => {
    if (!window.confirm(`Delete the "${vibeName}" vibe?`)) return;
    setSessionData(prev => {
      const keys = Object.keys(prev.vibes);
      if (keys.length === 1) {
        alert('You must keep at least one vibe.');
        return prev;
      }
      const newVibes = { ...prev.vibes };
      delete newVibes[vibeName];
      let newCurrentVibe = prev.currentVibe;
      if (vibeName === prev.currentVibe) {
        newCurrentVibe = Object.keys(newVibes)[0];
      }
      return { ...prev, vibes: newVibes, currentVibe: newCurrentVibe };
    });
  };

  const updateCurrentTasks = (newTasks) => {
    setSessionData(prev => ({ ...prev, vibes: { ...prev.vibes, [currentVibe]: newTasks } }));
  };

  const handleTaskTextChange = (id, value) => {
    const newTasks = (sessionData.vibes[currentVibe] || []).map(t => t.id === id ? { ...t, text: value } : t);
    updateCurrentTasks(newTasks);
  };

  const handleChoiceChange = (id, choice) => {
    const newTasks = (sessionData.vibes[currentVibe] || []).map(t => t.id === id ? { ...t, choice } : t);
    updateCurrentTasks(newTasks);
  };

  const handleAddTask = () => {
    const newTasks = [ ...(sessionData.vibes[currentVibe] || []), { id: Date.now(), text: 'New task...', choice: null } ];
    updateCurrentTasks(newTasks);
  };

  const handleRemoveTask = (id) => {
    const newTasks = (sessionData.vibes[currentVibe] || []).filter(t => t.id !== id);
    updateCurrentTasks(newTasks);
  };

  const handleReorder = (from, to) => {
    const tasksCopy = [ ...(sessionData.vibes[currentVibe] || []) ];
    const [removed] = tasksCopy.splice(from, 1);
    tasksCopy.splice(to, 0, removed);
    updateCurrentTasks(tasksCopy);
  };

  // const handleGenerateVibe = async () => {
  //   // AI logic disabled
  // };

  const tasks = sessionData ? (sessionData.vibes[currentVibe] || []) : [];

  if (isLoading) {
    return <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center"><h1 className="text-4xl text-cyan-400">Loading Session...</h1></div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4 sm:p-8 font-sans flex flex-col items-center antialiased">
  {/* styles moved to CSS file */}
      <div className="w-full max-w-4xl">
        <div className="text-center mb-4 relative">
          <AuthControls user={user} onSignIn={handleSignIn} onSignOut={handleSignOut} />
          <h1 className="animated-title text-6xl sm:text-7xl font-bold mb-4 text-white tracking-wide">Erin's Escapades</h1>
          <p className="text-gray-400 text-lg italic">Schemes, Dreams, and Questionable Decisions.</p>
        </div>
        <DayToggle activeDay={activeDay} setActiveDay={setActiveDay} />
        <div className="flex justify-end mb-2 text-xs font-mono">
          {saveError ? (
            <span className="text-red-400">Save failed. Will retry on next change.</span>
          ) : isSaving ? (
            <span className="text-cyan-400 animate-pulse">Saving...</span>
          ) : (
            <span className="text-gray-500">{sessionData?.updatedAt ? 'Last save ' + new Date(sessionData.updatedAt).toLocaleTimeString() : 'Preparing session...'}</span>
          )}
        </div>
  {/* AI Generator hidden for MVP */}
        <VibeSelector sessionData={sessionData} currentVibe={currentVibe} isOwner={isOwner} onSelect={handleListChange} onRename={handleRenameVibe} onDelete={handleDeleteVibe} />
        <TaskTable tasks={tasks} onTaskTextChange={handleTaskTextChange} onChoiceChange={handleChoiceChange} onRemoveTask={handleRemoveTask} onReorder={handleReorder} />
        <CommentsAndActions comments={comments} setComments={setComments} mailtoLink={mailtoLink} onAddTask={handleAddTask} />
        <div className="mt-6 p-3 bg-gray-800 rounded-lg text-center">
          <label className="font-bold text-cyan-400">Share this link:</label>
          <input type="text" readOnly value={shareableLink} className="w-full bg-gray-900 text-white p-2 mt-2 rounded-md text-center" />
        </div>
      </div>
    </div>
  );
}
