import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-container">
      <div className="progress-track">
        <motion.div 
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <div className="progress-info">
        <span>{Math.round(progress)}% COMPLETED</span>
        <span>{75 - Math.round((progress / 100) * 75)} DAYS REMAINING</span>
      </div>

    </div>
  );
};

export default ProgressBar;
