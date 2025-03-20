import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './WorkoutCreate.module.css';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { useReducer, useState } from 'react';
import ExerciseItem from '../../Exercise/ExerciseItem/ExerciseItem';
import { exercisesDatabase } from '../../../temp/data/exercise';

// Workout reducer function
const workoutReducer = (state, action) => {
  switch (action.type) {
    case 'updateName':
      return { ...state, name: action.payload };

    case 'addExercise':
      return {
        ...state,
        exercises: [
          ...state.exercises,
          { ...action.payload, id: state.exercises.length + 1 },
        ],
      };

    case 'removeExercise':
      return {
        ...state,
        exercises: state.exercises.filter(
          (_, index) => index !== action.payload.exerciseIndex
        ),
      };

    case 'addSet':
      return {
        ...state,
        exercises: state.exercises.map((exercise) =>
          exercise.id === action.payload.exerciseId
            ? {
                ...exercise,
                sets: [...exercise.sets, { unit: 0, quantity: 0 }],
              }
            : exercise
        ),
      };

    case 'removeSet':
      return {
        ...state,
        exercises: state.exercises.map((exercise) =>
          exercise.id === action.payload.exerciseId
            ? {
                ...exercise,
                sets: exercise.sets.filter(
                  (_, index) => index !== action.payload.setIndex
                ),
              }
            : exercise
        ),
      };

    case 'updateSet':
      return {
        ...state,
        exercises: state.exercises.map((exercise) =>
          exercise.id === action.payload.exerciseId
            ? {
                ...exercise,
                sets: exercise.sets.map((set, index) =>
                  index === action.payload.setIndex
                    ? { ...set, [action.payload.field]: action.payload.value }
                    : set
                ),
              }
            : exercise
        ),
      };

    case 'resetWorkout':
      return {
        name: '',
        date: new Date().toISOString(),
        exercises: [],
      };

    default:
      return state;
  }
};

export default function WorkoutCreate({ dispatch: appDispatch }) {
  const [workout, workoutDispatch] = useReducer(workoutReducer, {
    name: '',
    date: new Date().toISOString(),
    exercises: [],
  });
  const [selectedExerciseId, setSelectedExerciseId] = useState('');

  const addExercise = () => {
    if (!selectedExerciseId) return;

    const exerciseToAdd = exercisesDatabase.find(
      (ex) => ex.id === selectedExerciseId
    );
    if (exerciseToAdd) {
      workoutDispatch({
        type: 'addExercise',
        payload: { ...exerciseToAdd, sets: [{ unit: 0, quantity: 0 }] },
      });
      setSelectedExerciseId('');
    }
  };

  const createWorkout = (e) => {
    e.preventDefault();

    if (!workout.name.trim() || workout.exercises.length === 0) {
      alert('Please provide a workout name and at least one exercise');
      return;
    }

    appDispatch({ type: 'addWorkout', payload: workout });
    workoutDispatch({ type: 'resetWorkout' });
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
          onChange={(e) =>
            workoutDispatch({
              type: 'updateName',
              payload: e.target.value,
            })
          }
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
          {exercisesDatabase.map((exercise) => (
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
                dispatch={workoutDispatch}
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
