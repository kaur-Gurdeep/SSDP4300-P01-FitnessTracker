import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './WorkoutCreate.module.css';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const exercises = [
  { id: 'bench-press', name: 'Bench Press', type: 'Strength', sets: [] },
  { id: 'squats', name: 'Squats', type: 'Strength', sets: [] },
  { id: 'sit-ups', name: 'Sit-Ups', type: 'Strength', sets: [] },
  { id: 'jump-roping', name: 'Jump Rope', type: 'Cardio', sets: [] },
  { id: 'running', name: 'Running', type: 'Cardio', sets: [] },
  { id: 'swimming', name: 'Swimming', type: 'Cardio', sets: [] },
  { id: 'cycling', name: 'Cycling', type: 'Cardio', sets: [] },
];

export default function WorkoutCreate({ workouts, dispatch }) {
  const [selectedExerciseId, setSelectedExerciseId] = useState('');
  const [workoutName, setWorkoutName] = useState('');

  const createWorkout = (e) => {
    e.preventDefault();
    const newWorkout = {
      id: workouts.length + 1,
      date: new Date().toISOString(),
      name: workoutName,
      exercises: [],
    };
    dispatch({ type: 'addWorkout', payload: newWorkout });
    setWorkoutName('');
  };

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
          <button
            type='submit'
            className={styles.createBtn}
            onClick={createWorkout}
          >
            <FontAwesomeIcon icon={faSquareCheck} />
          </button>
        </div>
        <div className={styles.exerciseSelector}>
          <select
            name='exercise'
            id='exercise'
            className={styles.exerciseSelector}
            value={selectedExerciseId}
            onChange={(e) => setSelectedExerciseId(e.target.value)}
          >
            <option value=''>Select Exercise</option>
            {exercises.map((exercise) => (
              <option key={exercise.id} value={exercise.id}>
                {exercise.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.exerciseContainer}>
          {selectedExerciseId && (
            <div className={styles.exerciseForm}>
              <p>Set {selectedExercise.sets.length + 1}</p>
              <label htmlFor='reps' hidden>
                Reps
              </label>
              <input
                type='number'
                placeholder='Reps'
                value={
                  selectedExercise.sets[selectedExercise.sets.length - 1].reps
                }
              />
              <label htmlFor='weight' hidden>
                Weight
              </label>
              <input
                type='number'
                placeholder='Weight'
                value={
                  selectedExercise.sets[selectedExercise.sets.length - 1].weight
                }
              />
              <button type='submit' className={styles.addBtn}>
                <FontAwesomeIcon icon={faSquareCheck} />
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
