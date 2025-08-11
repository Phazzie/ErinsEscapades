import { useEffect, useRef, useState } from 'react';
import { db } from '../lib/firebase';
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
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
    let unsub;
    (async () => {
      try {
        const existing = await getDoc(docRef);
        if (existing.exists()) {
          const data = existing.data();
          setSessionData(data);
          setCurrentVibe(data.currentVibe);
          unsub = onSnapshot(docRef, snap => {
            if (snap.exists()) {
              const data2 = snap.data();
              setSessionData(data2);
              setCurrentVibe(data2.currentVibe);
            }
          });
        } else if (user) {
          const initialData = prepareInitialSession(user.uid);
            await setDoc(docRef, initialData); // persist with owner immediately
            setSessionData(initialData);
            setCurrentVibe(initialData.currentVibe);
            unsub = onSnapshot(docRef, snap => {
              if (snap.exists()) {
                const data3 = snap.data();
                setSessionData(data3);
                setCurrentVibe(data3.currentVibe);
              }
            });
        } else {
          // Not authenticated and no existing session: wait until user logs in.
        }
      } catch (e) {
        console.error('Session init error', e);
      } finally {
        setIsLoading(false);
        isInitial.current = false;
      }
    })();
    return () => { if (unsub) unsub(); };
  }, [sessionId, user]);

  useEffect(() => {
  if (isInitial.current || !sessionId || !sessionData) return;
  // Only the owner (authenticated) may write.
  if (!user || !sessionData.owner || user.uid !== sessionData.owner) return;
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
