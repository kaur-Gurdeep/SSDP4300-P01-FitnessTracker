import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './WorkoutCreate.module.css';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';

export default function WorkoutCreate() {
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
          <input type='text' placeholder='Workout Name' />
          {/* Finish Button */}
          <button type='submit' className={styles.createBtn}>
            <FontAwesomeIcon icon={faSquareCheck} />
          </button>
        </div>
      </form>
    </div>
  );
}
