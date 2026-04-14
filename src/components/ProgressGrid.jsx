import React from 'react';
import { useApp } from '../context/AppContext';

const ProgressGrid = () => {
  const { days, currentDayIndex } = useApp();

  return (
    <div className="grid-container glass-card">
      <div className="grid">
        {days.map((day, index) => {
          let statusClass = '';
          if (index < currentDayIndex) statusClass = 'completed';
          else if (index === currentDayIndex) statusClass = 'current';
          else statusClass = 'upcoming';

          return (
            <div 
              key={day.day} 
              className={`grid-cell ${statusClass}`}
              title={`Day ${day.day}`}
            >
              <span className="cell-number">{day.day}</span>
            </div>
          );
        })}
      </div>

      <div className="grid-legend">
        <div className="legend-item">
          <div className="legend-dot completed"></div>
          <span>Completed</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot current"></div>
          <span>Today</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot upcoming"></div>
          <span>Upcoming</span>
        </div>
      </div>

    </div>
  );
};

export default ProgressGrid;
