import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ progress }) => {
  // Assicuriamoci che il progresso sia un numero tra 0 e 100
  const progressValue = progress ? Math.min(Math.max(progress, 0), 100) : 0;
  
  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progressValue}%` }}
        ></div>
      </div>
      <div className="progress-text">
        Progresso: {progressValue}%
      </div>
    </div>
  );
};

export default ProgressBar;