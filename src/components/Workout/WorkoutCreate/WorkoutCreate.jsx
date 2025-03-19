import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './WorkoutCreate.module.css';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import ExerciseItem from '../../Exercise/ExerciseItem/ExerciseItem';
import { exercises } from '../../../temp/data/exercise';

export default function WorkoutCreate({ dispatch }) {
  const [workout, setWorkout] = useState({
    name: '',
    date: new Date().toISOString(),
    exercises: [],
  });
  const [selectedExerciseId, setSelectedExerciseId] = useState('');

  const addExercise = () => {
    if (!selectedExerciseId) return;

    const exerciseToAdd = exercises.find((ex) => ex.id === selectedExerciseId);
    if (exerciseToAdd) {
      setWorkout({
        ...workout,
        exercises: [...workout.exercises, { ...exerciseToAdd }],
      });
      setSelectedExerciseId('');
    }
  };

  const removeExercise = (exerciseIndex) => {
    setWorkout({
      ...workout,
      exercises: workout.exercises.filter(
        (_, index) => index !== exerciseIndex
      ),
    });
  };

  const updateName = (e) => {
    setWorkout({
      ...workout,
      name: e.target.value,
    });
  };

  const addSet = (exerciseId) => {
    setWorkout({
      ...workout,
      exercises: workout.exercises.map((exercise) =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              sets: [...exercise.sets, { unit: 0, quantity: 0 }],
            }
          : exercise
      ),
    });
  };

  const removeSet = (exerciseId, setIndex) => {
    setWorkout({
      ...workout,
      exercises: workout.exercises.map((exercise) =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              sets: exercise.sets.filter((_, index) => index !== setIndex),
            }
          : exercise
      ),
    });
  };

  const updateSet = (exerciseId, setIndex, newSet) => {
    setWorkout({
      ...workout,
      exercises: workout.exercises.map((exercise) =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              sets: exercise.sets.map((set, index) =>
                index === setIndex ? newSet : set
              ),
            }
          : exercise
      ),
    });
  };

  const createWorkout = (e) => {
    e.preventDefault();

    if (!workout.name.trim() || workout.exercises.length === 0) {
      alert('Please provide a workout name and at least one exercise');
      return;
    }

    dispatch({ type: 'addWorkout', payload: workout });

    setWorkout({
      name: '',
      date: new Date().toISOString(),
      exercises: [],
    });
    setSelectedExerciseId('');
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
          value={workout.name}
          onChange={updateName}
        />
      </div>

      {/* Exercise Selector */}
      <div className={styles.exerciseSelector}>
        <label htmlFor='exercise' hidden>
          Exercise Selector
        </label>
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
          onClick={addExercise}
          disabled={!selectedExerciseId}
        >
          <FontAwesomeIcon icon={faSquareCheck} />
        </button>
      </div>

      {/* Display selected exercises */}
      <div className={styles.selectedExercises}>
        <h3>Selected Exercises</h3>
        {workout.exercises.length === 0 ? (
          <p>No exercises added yet</p>
        ) : (
          <ul>
            {workout.exercises.map((exercise, index) => (
              <ExerciseItem
                key={index}
                exercise={exercise}
                removeExercise={() => removeExercise(index)}
                addSet={addSet}
                removeSet={removeSet}
                updateSet={updateSet}
                exerciseIndex={index}
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
          disabled={!workout.name.trim() || workout.exercises.length === 0}
        >
          Create Workout
        </button>
      </div>
    </div>
  );
}
