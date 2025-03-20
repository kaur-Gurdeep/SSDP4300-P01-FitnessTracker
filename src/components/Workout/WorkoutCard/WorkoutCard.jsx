import styles from './WorkoutCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faWeightHanging,
  faRunning,
} from '@fortawesome/free-solid-svg-icons';

export default function WorkoutCard({ workout }) {
  function calculateTotalDuration() {
    return workout.exercises.reduce(
      (total, exercise) => total + exercise.duration,
      0
    );
  }

  function calculateTotalWeight() {
    return workout.exercises.reduce(
      (total, exercise) =>
        total +
        exercise.sets.reduce((setTotal, set) => {
          if (exercise.type === 'strength') {
            return setTotal + set.quantity * set.unit;
          } else {
            return setTotal;
          }
        }, 0),
      0
    );
  }

  function calculateTotalDistance() {
    return workout.exercises.reduce(
      (total, exercise) =>
        total +
        exercise.sets.reduce((setTotal, set) => {
          if (exercise.type === 'cardio') {
            return setTotal + set.quantity;
          } else {
            return setTotal;
          }
        }, 0),
      0
    );
  }

  function calculateBestSet(exercise) {
    if (exercise.type === 'strength') {
      return exercise.sets.reduce(
        (bestSet, set) =>
          set.quantity * set.unit > bestSet.quantity * bestSet.unit
            ? set
            : bestSet,
        { quantity: 0, unit: 0 }
      );
    } else if (exercise.type === 'cardio') {
      return exercise.sets.reduce(
        (bestSet, set) =>
          set.quantity * set.unit > bestSet.quantity * bestSet.unit
            ? set
            : bestSet,
        { quantity: 0, unit: 0 }
      );
    }
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'full',
    }).format(date);
  }

  function formatTime(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      timeStyle: 'short',
    }).format(date);
  }

  return (
    <div className={styles.workoutCard}>
      <div className={styles.workoutHeader}>
        <h3>{workout.name}</h3>
        <button>...</button>
      </div>
      <div className={styles.dateTime}>
        <p className={styles.date}>{formatDate(workout.date)}</p>
        <p className={styles.time}>{formatTime(workout.date)}</p>
      </div>
      <div className={styles.stats}>
        <p>
          <FontAwesomeIcon icon={faClock} /> {calculateTotalDuration()} mins
        </p>
        <p>
          <FontAwesomeIcon icon={faRunning} />{' '}
          {calculateTotalDistance() > 1000
            ? ` ${calculateTotalDistance() / 1000} km`
            : ` ${calculateTotalDistance()} m`}
        </p>
        <p>
          <FontAwesomeIcon icon={faWeightHanging} /> {calculateTotalWeight()} kg
        </p>
      </div>
      <div className={styles.exercises}>
        <table>
          <thead>
            <tr>
              <th>Exercise</th>
              <th>Best Set</th>
            </tr>
          </thead>
          <tbody>
            {workout.exercises.map((exercise) => (
              <tr key={exercise.id}>
                <td>{exercise.name}</td>
                {exercise.type === 'strength' && (
                  <td>
                    {calculateBestSet(exercise).quantity}kg x{' '}
                    {calculateBestSet(exercise).unit} reps
                  </td>
                )}
                {exercise.type === 'cardio' && (
                  <td>
                    {calculateBestSet(exercise).quantity}m x{' '}
                    {calculateBestSet(exercise).unit} s
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
