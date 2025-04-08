import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './WorkoutCreate.module.css';
import { faCheck, faPlus, faPlay, faPause, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useReducer, useState } from 'react';
import ExerciseItem from '../../Exercise/ExerciseItem/ExerciseItem';
import { exercisesDatabase } from '../../../temp/data/exercise';
import WorkoutTimer from '../WorkoutTimer/WorkoutTimer';
import { v4 as uuidv4 } from 'uuid';

// Workout reducer function
const workoutReducer = (state, action) => {
  switch (action.type) {
    case 'updateName':
      return { ...state, name: action.payload };

    case 'updateDuration':
      return { ...state, duration: action.payload };

    case 'addExercise':
      return {
        ...state,
        exercises: [...state.exercises, { ...action.payload, id: state.exercises.length + 1 }],
      };

    case 'removeExercise':
      return {
        ...state,
        exercises: state.exercises.filter((_, index) => index !== action.payload.exerciseIndex),
      };

    case 'addSet':
      return {
        ...state,
        exercises: state.exercises.map((exercise) =>
          exercise.id === action.payload.exerciseId
            ? {
                ...exercise,
                sets: [...exercise.sets, { unit: 0, quantity: 0, isComplete: false }],
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
                sets: exercise.sets.filter((_, index) => index !== action.payload.setIndex),
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
                    ? {
                        ...set,
                        [action.payload.field]: Number(action.payload.value),
                      }
                    : set
                ),
              }
            : exercise
        ),
      };

    case 'completeSet':
      return {
        ...state,
        exercises: state.exercises.map((exercise) =>
          exercise.id === action.payload.exerciseId
            ? {
                ...exercise,
                sets: exercise.sets.map((set, index) => (index === action.payload.setIndex ? { ...set, isComplete: !set.isComplete } : set)),
              }
            : exercise
        ),
      };

    case 'resetWorkout':
      return {
        name: '',
        date: new Date().toISOString(),
        exercises: [],
        duration: 0,
      };

    default:
      return state;
  }
};

const addWorkout = async (workoutObj) => {
  const API_GATEWAY_URL = 'https://mqjxfg30t9.execute-api.us-west-2.amazonaws.com/test/workouts';
  try {
    const response = await fetch(API_GATEWAY_URL, {
      method: 'POST',
      body: JSON.stringify({
        operation: 'createWorkout',
        payload: { Item: workoutObj },
      }),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding workout:', error.message);
  }
};

export default function WorkoutCreate({ dispatch: appDispatch, refreshWorkouts }) {
  const [workout, workoutDispatch] = useReducer(workoutReducer, {
    name: '',
    date: new Date().toISOString(),
    exercises: [],
    duration: 0,
  });
  const [selectedExerciseId, setSelectedExerciseId] = useState('');
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);

  const addExercise = () => {
    if (!selectedExerciseId) return;

    const exerciseToAdd = exercisesDatabase.find((ex) => ex.id === selectedExerciseId);
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
    const workoutWithMeta = {
      ...workout,
      id: uuidv4(),
      user: JSON.parse(localStorage.getItem('user'))?.email,
      date: new Date().toISOString(),
    };
    appDispatch({ type: 'addWorkout', payload: workoutWithMeta });
    addWorkout(workoutWithMeta).then(() => {
      refreshWorkouts();
    });
    workoutDispatch({ type: 'resetWorkout' });
    setSelectedExerciseId('');
  };

  const cancelWorkout = (e) => {
    e.preventDefault();
    workoutDispatch({ type: 'resetWorkout' });
  };

  const handleTimerUpdate = (seconds) => {
    workoutDispatch({
      type: 'updateDuration',
      payload: seconds,
    });
  };

  const toggleWorkout = () => {
    setIsWorkoutActive((prevState) => !prevState);
  };

  return (
    <div className={styles.createWorkout}>
      <div className={styles.workoutHeader}>
        {/* Timer Display */}
        <div className={styles.timerSection}>
          <WorkoutTimer isRunning={isWorkoutActive} onTimerUpdate={handleTimerUpdate} />
        </div>

        {/* Workout Name Input */}
        <label htmlFor="workoutName" hidden>
          Workout Name
        </label>
        <input
          type="text"
          id="workoutName"
          placeholder="Workout Name"
          value={workout.name}
          onChange={(e) =>
            workoutDispatch({
              type: 'updateName',
              payload: e.target.value,
            })
          }
        />
        {/* Complete Workout Button */}
        <button type="submit" className={styles.createBtn} onClick={createWorkout} disabled={!workout.name.trim() || workout.exercises.length === 0} aria-label="Create workout">
          <FontAwesomeIcon icon={faCheck} />
        </button>
      </div>

      {/* Exercise Selector */}
      <div className={styles.exerciseSelector}>
        <select name="exercise" id="exercise" value={selectedExerciseId} onChange={(e) => setSelectedExerciseId(e.target.value)}>
          <option value="">Select Exercise</option>
          {exercisesDatabase.map((exercise) => (
            <option key={exercise.id} value={exercise.id}>
              {exercise.name}
            </option>
          ))}
        </select>
        <button type="button" className={styles.addBtn} onClick={addExercise} disabled={!selectedExerciseId} aria-label="Add exercise">
          <FontAwesomeIcon icon={faPlus} /> Add Exercise
        </button>
      </div>

      {/* Display selected exercises */}
      <div className={styles.workoutExercises}>
        {workout.exercises.length === 0 ? (
          <p>No exercises added yet</p>
        ) : (
          <div className={styles.workoutExercise}>
            {workout.exercises.map((exercise, index) => (
              <ExerciseItem key={index} exercise={exercise} dispatch={workoutDispatch} exerciseIndex={index} />
            ))}
          </div>
        )}
      </div>

      {/* Create Workout Button */}
      <div className={styles.formActions}>
        <button onClick={toggleWorkout} className={isWorkoutActive ? styles.pauseBtn : styles.startBtn}>
          <FontAwesomeIcon icon={isWorkoutActive ? faPause : faPlay} />
          {isWorkoutActive ? 'Pause Workout' : 'Start Workout'}
        </button>
        <button onClick={cancelWorkout} className={styles.cancelBtn}>
          <FontAwesomeIcon icon={faTimes} />
          Cancel Workout
        </button>
      </div>
    </div>
  );
}
