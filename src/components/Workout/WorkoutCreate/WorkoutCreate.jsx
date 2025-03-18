import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './WorkoutCreate.module.css';
import { faSquareCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

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
  const [workoutName, setWorkoutName] = useState('');
  const [selectedExerciseId, setSelectedExerciseId] = useState('');
  const [workoutExercises, setWorkoutExercises] = useState([]);

  // Update workout name effect
  useEffect(() => {
    // No need to update the workout object on every name change
    // We'll create the final workout object only when submitting
  }, [workoutName]);

  const addExerciseToWorkout = () => {
    if (!selectedExerciseId) return;

    const exerciseToAdd = exercises.find((ex) => ex.id === selectedExerciseId);
    if (exerciseToAdd) {
      // Add a copy of the exercise to prevent modifying the original
      setWorkoutExercises([
        ...workoutExercises,
        { ...exerciseToAdd, sets: [] },
      ]);
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

    // Create the complete workout object
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
                <li key={`${exercise.id}-${Math.random()}`}>
                  {exercise.name} - {exercise.type}
                  <button
                    type='button'
                    onClick={() => removeExerciseFromWorkout(exercise.id)}
                    className={styles.removeBtn}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </li>
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
      </form>
    </div>
  );
}
