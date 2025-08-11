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
    if (newName && newName.trim() !== '' && oldName !== newName) {
      const newVibeKey = newName.trim().toLowerCase().replace(/\s+/g, '_');
      setSessionData(prev => {
        const newVibes = { ...prev.vibes };
        newVibes[newVibeKey] = newVibes[oldName];
        delete newVibes[oldName];
        return { ...prev, vibes: newVibes, currentVibe: newVibeKey };
      });
    }
  };

  const handleDeleteVibe = (vibeName) => {
    if (window.confirm(`Are you sure you want to delete the "${vibeName}" vibe?`)) {
      setSessionData(prev => {
        const newVibes = { ...prev.vibes };
        delete newVibes[vibeName];
        const newCurrentVibe = vibeName === prev.currentVibe ? Object.keys(newVibes)[0] || 'default' : prev.currentVibe;
        return { ...prev, vibes: newVibes, currentVibe: newCurrentVibe };
      });
    }
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
      <style>{`@keyframes rainbow-glow {0%, 100% { text-shadow: 0 0 15px #ff69b4, 0 0 25px #ff69b4;}25% { text-shadow: 0 0 15px #00ffff, 0 0 25px #00ffff;}50% { text-shadow: 0 0 15px #7fff00, 0 0 25px #7fff00;}75% { text-shadow: 0 0 15px #f0e68c, 0 0 25px #f0e68c;}}.animated-title { animation: rainbow-glow 6s ease-in-out infinite; }.text-glow-accent { text-shadow: 0 0 8px rgba(255, 105, 180, 0.7), 0 0 20px rgba(255, 105, 180, 0.5); }.button-glow-blue { box-shadow: 0 0 10px rgba(59, 130, 246, 0.6), 0 0 20px rgba(59, 130, 246, 0.4); }.button-glow-green { box-shadow: 0 0 10px rgba(34, 197, 94, 0.6), 0 0 20px rgba(34, 197, 94, 0.4); }.form-radio:checked { background-color: #ff69b4; border-color: #ff85c1; box-shadow: 0 0 8px rgba(255, 105, 180, 0.7); }`}</style>
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
