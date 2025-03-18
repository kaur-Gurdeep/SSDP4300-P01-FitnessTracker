import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './WorkoutCreate.module.css';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const exercises = [
  { id: 1, name: 'Bench Press', type: 'Strength', reps: [] },
  { id: 2, name: 'Squats', type: 'Strength', reps: [] },
  { id: 3, name: 'Sit-Ups', type: 'Strength', reps: [] },
  { id: 4, name: 'Jump Rope', type: 'Cardio', time: [] },
  { id: 5, name: 'Running', type: 'Cardio', time: [] },
  { id: 6, name: 'Swimming', type: 'Cardio', time: [] },
  { id: 7, name: 'Cycling', type: 'Cardio', time: [] },
];

export default function WorkoutCreate({ workout, dispatch }) {
  const [selectedExercise, setSelectedExercise] = useState('');
  const [workoutName, setWorkoutName] = useState('');

  return (
    <div className={styles.createWorkout}>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={styles.createWorkout}
      >
        <div className='workoutHeader'>
          {/* Workout Name Input */}
          <label htmlFor='workoutName' hidden>
            Workout Name
          </label>
          <input
            type='text'
            placeholder='Workout Name'
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
          />
          {/* Finish Button */}
          <button type='submit' className={styles.createBtn}>
            <FontAwesomeIcon icon={faSquareCheck} />
          </button>
        </div>
        <div className={styles.exerciseSelector}>
          <select
            name='exercise'
            id='exercise'
            className={styles.exerciseSelector}
            value={selectedExercise}
            onChange={(e) => setSelectedExercise(e.target.value)}
          >
            <option value=''>Select Exercise</option>
            {exercises.map((exercise) => (
              <option key={exercise.id} value={exercise.id}>
                {exercise.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
}
