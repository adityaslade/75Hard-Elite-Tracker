import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const AppContext = createContext();

const DEFAULT_TASKS = [
  { id: 'workout_indoor', label: '45-min Workout (Indoor)', type: 'workout', completed: false },
  { id: 'workout_outdoor', label: '45-min Workout (Outdoor)', type: 'outdoor', completed: false },
  { id: 'water', label: '1 Gallon Water', type: 'water', completed: false },
  { id: 'read', label: 'Read 10 Pages', type: 'book', completed: false },
  { id: 'diet', label: 'Follow Diet', type: 'diet', completed: false },
  { id: 'alcohol', label: 'No Alcohol', type: 'alcohol', completed: false },
  { id: 'pic', label: 'Progress Picture', type: 'camera', completed: false },
];

const createEmptyDays = () => Array.from({ length: 75 }, (_, i) => ({
  day: i + 1,
  tasks: DEFAULT_TASKS.map(t => ({ ...t })),
  completed: false,
  failed: false,
  date: null
}));

export const AppProvider = ({ children }) => {
  const { user } = useAuth();
  const [days, setDays] = useState(createEmptyDays());
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Sync from Firestore when user logs in
  useEffect(() => {
    if (!user) {
      setDays(createEmptyDays());
      setCurrentDayIndex(0);
      setLoading(false);
      return;
    }

    const docRef = doc(db, 'users', user.uid);
    
    // Using onSnapshot for real-time updates and initial fetch
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.progress) setDays(data.progress);
        if (data.currentDayIndex !== undefined) setCurrentDayIndex(data.currentDayIndex);
      } else {
        // Initialize new user data in Firestore
        setDoc(docRef, {
          email: user.email,
          displayName: user.displayName || '',
          createdAt: new Date().toISOString(),
          progress: createEmptyDays(),
          currentDayIndex: 0
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Helper to save to Firestore
  const saveToFirestore = async (newDays, newIndex) => {
    if (!user) return;
    const docRef = doc(db, 'users', user.uid);
    try {
      await setDoc(docRef, {
        progress: newDays || days,
        currentDayIndex: newIndex !== undefined ? newIndex : currentDayIndex
      }, { merge: true });
    } catch (err) {
      console.error("Error saving progress:", err);
    }
  };

  const toggleTask = async (taskId) => {
    const newDays = [...days];
    const currentDay = newDays[currentDayIndex];
    currentDay.tasks = currentDay.tasks.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    
    const allDone = currentDay.tasks.every(t => t.completed);
    currentDay.completed = allDone;
    
    setDays(newDays);
    await saveToFirestore(newDays);
  };

  const completeDay = async () => {
    if (currentDayIndex < 74) {
      const nextIndex = currentDayIndex + 1;
      setCurrentDayIndex(nextIndex);
      await saveToFirestore(days, nextIndex);
    }
  };

  const failChallenge = async () => {
    if (window.confirm("This will reset your progress to Day 1. Are you sure?")) {
      const resetDays = createEmptyDays();
      setDays(resetDays);
      setCurrentDayIndex(0);
      await saveToFirestore(resetDays, 0);
    }
  };

  const value = {
    days,
    currentDay: days[currentDayIndex],
    currentDayIndex,
    toggleTask,
    completeDay,
    failChallenge,
    progress: ((currentDayIndex) / 75) * 100,
    loading
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
