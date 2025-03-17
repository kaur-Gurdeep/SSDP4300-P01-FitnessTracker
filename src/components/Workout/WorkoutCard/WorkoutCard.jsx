import styles from './WorkoutCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faWeightHanging } from '@fortawesome/free-solid-svg-icons';

const workout = {
  id: 1,
  date: '2025-03-16',
  name: 'Workout 1',
  exercises: [
    {
      id: 1,
      name: 'Exercise 1',
      duration: 30,
      sets: [
        {
          reps: 10,
          weight: 100,
        },
        {
          reps: 10,
          weight: 100,
        },
        {
          reps: 10,
          weight: 100,
        },
      ],
    },
    {
      id: 2,
      name: 'Exercise 2',
      duration: 30,
      sets: [
        {
          reps: 10,
          weight: 100,
        },
        {
          reps: 10,
          weight: 100,
        },
        {
          reps: 10,
          weight: 100,
        },
      ],
    },
  ],
};

export default function WorkoutCard() {
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
        exercise.sets.reduce(
          (setTotal, set) => setTotal + set.weight * set.reps,
          0
        ),
      0
    );
  }

  function calculateBestSet(exercise) {
    return exercise.sets.reduce(
      (bestSet, set) =>
        set.weight * set.reps > bestSet.weight * bestSet.reps ? set : bestSet,
      { weight: 0, reps: 0 }
    );
  }

  return (
    <div className={styles.workoutCard}>
      <div className={styles.workoutHeader}>
        <h3>{workout.name}</h3>
        <button>...</button>
      </div>
      <p className={styles.date}>{workout.date}</p>
      <div className={styles.stats}>
        <p>
          <FontAwesomeIcon icon={faClock} />
          {calculateTotalDuration()}
        </p>
        <p>
          <FontAwesomeIcon icon={faWeightHanging} />
          {calculateTotalWeight()}
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
                <td>
                  {calculateBestSet(exercise).weight}kg x{' '}
                  {calculateBestSet(exercise).reps} reps
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
