import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './WorkoutCreate.module.css';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import ExerciseItem from '../../Exercise/ExerciseItem/ExerciseItem';

const exercises = [
  {
    id: 'bench-press',
    name: 'Bench Press',
    type: 'Strength',
    sets: [
      { reps: 10, weight: 100 },
      { reps: 10, weight: 100 },
      { reps: 10, weight: 100 },
      { reps: 10, weight: 150 },
    ],
  },
  {
    id: 'squats',
    name: 'Squats',
    type: 'Strength',
    sets: [
      { reps: 6, weight: 250 },
      { reps: 6, weight: 250 },
      { reps: 6, weight: 250 },
      { reps: 6, weight: 300 },
    ],
  },
  {
    id: 'clean-jerk',
    name: 'Clean & Jerk',
    type: 'Strength',
    sets: [
      { reps: 5, weight: 100 },
      { reps: 6, weight: 150 },
      { reps: 5, weight: 200 },
      { reps: 5, weight: 225 },
      { reps: 3, weight: 250 },
    ],
  },
  {
    id: 'running',
    name: 'Running',
    type: 'Cardio',
    sets: [
      { distance: 1000, time: 30 },
      { distance: 2000, time: 70 },
      { distance: 3000, time: 120 },
    ],
  },
  {
    id: 'swimming',
    name: 'Swimming',
    type: 'Cardio',
    sets: [
      { distance: 300, time: 120 },
      { distance: 300, time: 120 },
      { distance: 300, time: 135 },
    ],
  },
  {
    id: 'cycling',
    name: 'Cycling',
    type: 'Cardio',
    sets: [
      { distance: 2000, time: 400 },
      { distance: 2000, time: 430 },
      { distance: 2000, time: 380 },
    ],
  },
];

export default function WorkoutCreate({ dispatch }) {
  const [workoutName, setWorkoutName] = useState('');
  const [selectedExerciseId, setSelectedExerciseId] = useState('');
  const [workoutExercises, setWorkoutExercises] = useState([]);

  const addExerciseToWorkout = () => {
    if (!selectedExerciseId) return;

    const exerciseToAdd = exercises.find((ex) => ex.id === selectedExerciseId);
    if (exerciseToAdd) {
      // Add a copy of the exercise to prevent modifying the original
      setWorkoutExercises([...workoutExercises, { ...exerciseToAdd }]);
      setSelectedExerciseId(''); // Reset selection
    }
  };

  const removeExerciseFromWorkout = (exerciseId) => {
    setWorkoutExercises(workoutExercises.filter((ex) => ex.id !== exerciseId));
  };

  const createWorkout = (e) => {
    e.preventDefault();

    if (!workoutName.trim() || workoutExercises.length === 0) {
      alert('Please provide a workout name and at least one exercise');
      return;
    }

    // Create the workout object without ID and date - reducer will handle those
    const newWorkout = {
      name: workoutName,
      exercises: workoutExercises,
    };

    // Dispatch to add the workout to the global state
    dispatch({ type: 'addWorkout', payload: newWorkout });

    // Reset form
    setWorkoutName('');
    setWorkoutExercises([]);
  };

  return (
    <div className={styles.createWorkout}>
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
      </div>

      {/* Exercise Selector */}
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
        <button
          type='button'
          className={styles.addBtn}
          onClick={addExerciseToWorkout}
        >
          <FontAwesomeIcon icon={faSquareCheck} />
        </button>
      </div>

      {/* Display selected exercises */}
      <div className={styles.selectedExercises}>
        <h3>Selected Exercises</h3>
        {workoutExercises.length === 0 ? (
          <p>No exercises added yet</p>
        ) : (
          <ul>
            {workoutExercises.map((exercise) => (
              <ExerciseItem
                key={`${exercise.id}-${Math.random()}`}
                exercise={exercise}
                onRemove={removeExerciseFromWorkout}
              />
            ))}
          </ul>
        )}
      </div>

      {/* Create Workout Button */}
      <div className={styles.formActions}>
        <button
          type='submit'
          className={styles.createBtn}
          onClick={createWorkout}
          disabled={!workoutName.trim() || workoutExercises.length === 0}
        >
          Create Workout
        </button>
      </div>
    </div>
  );
}
