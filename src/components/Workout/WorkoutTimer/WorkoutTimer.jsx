import React, { useState, useEffect } from 'react';
import styles from './WorkoutTimer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

const WorkoutTimer = ({ isRunning, onTimerUpdate }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          const newSeconds = prevSeconds + 1;
          onTimerUpdate(newSeconds);
          return newSeconds;
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, onTimerUpdate]);

  // conditionally render and only show minutes when seconds is above 60, and same with hours
  // default display is 0:00

  // conditionally render the suffix and only show the suffix when the value is greater than 0
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (minutes > 60) {
      return [
        Math.floor(minutes / 60),
        minutes % 60,
        seconds.toString().padStart(2, '0'),
      ].join(':');
    }
    return [
      minutes > 0 ? minutes.toString().padStart(1, '0') : '0',
      seconds.toString().padStart(2, '0'),
    ].join(':');
  };

  return (
    <div className={styles.workoutTimer}>
      <div className={styles.timerDisplay}>
        <FontAwesomeIcon icon={faClock} /> {formatTime(seconds)}
      </div>
    </div>
  );
};

export default WorkoutTimer;
