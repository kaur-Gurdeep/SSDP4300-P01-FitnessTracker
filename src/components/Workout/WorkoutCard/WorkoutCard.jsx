import styles from './WorkoutCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faWeightHanging, faRunning, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const removeWorkout = async (workoutId) => {
  const API_GATEWAY_URL = 'https://mqjxfg30t9.execute-api.us-west-2.amazonaws.com/test/workouts';
  try {
    const response = await fetch(API_GATEWAY_URL, {
      method: 'DELETE',
      body: JSON.stringify({
        operation: 'deleteWorkout',
        payload: {
          Key: {
            id: workoutId,
          },
          TableName: '',
        },
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

export default function WorkoutCard({ workout }) {
  const deleteWorkout = () => {
    console.log(workout.id);
    removeWorkout(workout.id).then(() => {
      // refreshWorkouts();
    });
  };

  function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes > 60) {
      return `${Math.floor(minutes / 60)}h ${minutes % 60}m ${remainingSeconds}s`;
    }
    return `${minutes}m ${remainingSeconds}s`;
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
    if (!exercise.sets || exercise.sets.length === 0) {
      return { quantity: 0, unit: 0 };
    }

    if (exercise.type === 'strength') {
      return exercise.sets.reduce((bestSet, set) => (set.quantity * set.unit > bestSet.quantity * bestSet.unit ? set : bestSet), { quantity: 0, unit: 0 });
    } else if (exercise.type === 'cardio') {
      // For cardio, we want the highest distance in shortest time
      return exercise.sets.reduce((bestSet, set) => (set.quantity > bestSet.quantity ? set : bestSet), { quantity: 0, unit: 0 });
    }
    return { quantity: 0, unit: 0 };
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
        <button className={styles.menuButton} onClick={deleteWorkout}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
      </div>
      <div className={styles.dateTime}>
        <p className={styles.date}>{formatDate(workout.date)}</p>
        <p className={styles.time}>{formatTime(workout.date)}</p>
      </div>
      <div className={styles.stats}>
        <p>
          <FontAwesomeIcon icon={faClock} />
          <span>{formatDuration(workout.duration || 0)}</span>
        </p>
        <p>
          <FontAwesomeIcon icon={faRunning} />
          <span>{calculateTotalDistance() > 1000 ? `${(calculateTotalDistance() / 1000).toFixed(2)} km` : `${calculateTotalDistance()} m`}</span>
        </p>
        <p>
          <FontAwesomeIcon icon={faWeightHanging} />
          <span>{calculateTotalWeight()} kg</span>
        </p>
      </div>
      <div className={styles.exercises}>
        {workout.exercises && workout.exercises.length > 0 ? (
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
                      {calculateBestSet(exercise).quantity}kg x {calculateBestSet(exercise).unit} reps
                    </td>
                  )}
                  {exercise.type === 'cardio' && (
                    <td>
                      {calculateBestSet(exercise).quantity}m in {calculateBestSet(exercise).unit}s
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={styles.emptyState}>No exercises recorded</p>
        )}
      </div>
    </div>
  );
}
