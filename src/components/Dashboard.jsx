import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import Header from './Header';
import ProgressBar from './ProgressBar';
import Checklist from './Checklist';
import ProgressGrid from './ProgressGrid';
import { Trophy, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const Dashboard = () => {
  const { currentDay, currentDayIndex, progress, completeDay, failChallenge, loading } = useApp();

  const handleDayComplete = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#10b981', '#ffffff']
    });
    completeDay();
  };

  if (loading) {
    return (
      <div className="app-container">
        <Header />
        <div className="auth-container">
          <div className="loading-spinner">Syncing your progress...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header />
      
      <main className="content">
        <section className="hero-section">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="day-counter"
          >
            <span className="day-label">DAY</span>
            <h1 className="day-number text-gradient">{currentDayIndex + 1}</h1>
            <span className="total-days">OF 75</span>
          </motion.div>

          <ProgressBar progress={progress} />
        </section>

        <div className="dashboard-grid">
          <section className="tasks-column">
            <h2 className="section-title">Today's Tasks</h2>
            <Checklist />
            
            <AnimatePresence>
              {currentDay?.completed && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="btn-primary complete-day-btn"
                  onClick={handleDayComplete}
                >
                  <Trophy size={20} />
                  Complete Day {currentDayIndex + 1}
                </motion.button>
              )}
            </AnimatePresence>
          </section>

          <section className="grid-column">
            <h2 className="section-title">Journey Progress</h2>
            <ProgressGrid />
            
            <button className="fail-btn" onClick={failChallenge}>
              <AlertCircle size={16} />
              I failed a task today
            </button>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>Built with discipline. Created by Aditya.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
