import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Check, Dumbbell, Droplets, BookOpen, Utensils, Ban, Camera, CloudSun } from 'lucide-react';

const icons = {
  workout: <Dumbbell size={20} />,
  outdoor: <CloudSun size={20} />,
  water: <Droplets size={20} />,
  book: <BookOpen size={20} />,
  diet: <Utensils size={20} />,
  alcohol: <Ban size={20} />,
  camera: <Camera size={20} />
};

const Checklist = () => {
  const { currentDay, toggleTask } = useApp();

  if (!currentDay) return null;

  return (
    <div className="checklist">
      {currentDay.tasks.map((task, index) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`task-card glass-card ${task.completed ? 'completed' : ''}`}
          onClick={() => toggleTask(task.id)}
        >
          <div className="task-icon-container">
            {icons[task.type] || <Check size={20} />}
          </div>
          
          <div className="task-content">
            <span className="task-label">{task.label}</span>
          </div>

          <div className={`checkbox ${task.completed ? 'checked' : ''}`}>
            {task.completed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Check size={16} color="white" strokeWidth={3} />
              </motion.div>
            )}
          </div>
        </motion.div>
      ))}

    </div>
  );
};

export default Checklist;
