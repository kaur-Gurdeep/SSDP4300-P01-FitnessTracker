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
            return setTotal + set.weight * set.reps;
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
            return setTotal + set.distance;
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
          set.weight * set.reps > bestSet.weight * bestSet.reps ? set : bestSet,
        { weight: 0, reps: 0 }
      );
    } else if (exercise.type === 'cardio') {
      return exercise.sets.reduce(
        (bestSet, set) =>
          set.distance * set.time > bestSet.distance * bestSet.time
            ? set
            : bestSet,
        { distance: 0, time: 0 }
      );
    }
  }

  return (
    <div className={styles.workoutCard}>
      <div className={styles.workoutHeader}>
        <h3>{workout.name}</h3>
        <button>...</button>
      </div>
      <p className={styles.date}>Date: {workout.date}</p>
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
                    {calculateBestSet(exercise).weight}kg x{' '}
                    {calculateBestSet(exercise).reps} reps
                  </td>
                )}
                {exercise.type === 'cardio' && (
                  <td>
                    {calculateBestSet(exercise).distance}m x{' '}
                    {calculateBestSet(exercise).time} s
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
