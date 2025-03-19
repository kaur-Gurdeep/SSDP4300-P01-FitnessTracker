import React from 'react';

const UserHealthSummary = () => {
  const healthData = {
    workoutCount: 32,
    progress: 75, 
  };

  return (
    <div className="user-health-summary">
      <h3>Your Health Summary</h3>
      <p><strong>Workouts Completed:</strong> {healthData.workoutCount}</p>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${healthData.progress}%` }}></div>
      </div>
      <p><strong>Progress:</strong> {healthData.progress}%</p>
    </div>
  );
};

export default UserHealthSummary;
