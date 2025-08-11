import { useEffect, useRef, useState } from 'react';
import { db } from '../lib/firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { prepareInitialSession, touchSession } from '../lib/sessionService';

const initialTaskLists = null; // now provided by prepareInitialSession

export function useSession(sessionId, user) {
  const [sessionData, setSessionData] = useState(null);
  const [currentVibe, setCurrentVibe] = useState('default');
  const [isLoading, setIsLoading] = useState(true);
  const [saveError, setSaveError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const isInitial = useRef(true);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (!sessionId) return;
    const docRef = doc(db, 'sessions', sessionId);
    const unsub = onSnapshot(docRef, snap => {
      if (snap.exists()) {
        const data = snap.data();
        setSessionData(data);
        setCurrentVibe(data.currentVibe);
      } else {
        const initialData = prepareInitialSession(user ? user.uid : 'anonymous');
        setSessionData(initialData);
      }
      setIsLoading(false);
      isInitial.current = false;
    });
    return () => unsub();
  }, [sessionId, user]);

  useEffect(() => {
    if (isInitial.current || !sessionId || !sessionData) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const docRef = doc(db, 'sessions', sessionId);
      const toSave = touchSession(sessionData);
      setIsSaving(true);
      setDoc(docRef, toSave)
        .then(() => {
          setSaveError(null);
          setIsSaving(false);
          setSessionData(prev => ({ ...prev, updatedAt: toSave.updatedAt }));
        })
        .catch((err) => {
          console.error(err);
          setSaveError('Failed to save session data.');
          setIsSaving(false);
        });
    }, 400);
    return () => debounceRef.current && clearTimeout(debounceRef.current);
  }, [sessionData, sessionId]);

  return { sessionData, setSessionData, currentVibe, setCurrentVibe, isLoading, saveError, isSaving };
}
