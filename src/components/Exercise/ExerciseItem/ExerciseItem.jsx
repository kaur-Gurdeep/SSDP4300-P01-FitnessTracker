import styles from './ExerciseItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import SetItem from '../../Set/SetItem/SetItem';

export default function ExerciseItem({ exercise, dispatch, exerciseIndex }) {
  return (
    <div className={styles.exerciseItem}>
      <div className={styles.exerciseHeader}>
        <span>{exercise.name}</span>
        <button
          type='button'
          onClick={() =>
            dispatch({
              type: 'removeExercise',
              payload: { exerciseIndex },
            })
          }
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
      <div className={styles.setsContainer}>
        <div className={styles.setHeader}>
          <span>Set</span>
          {exercise.type === 'strength' ? (
            <>
              <span>Reps</span>
              <span>Weight</span>
            </>
          ) : (
            <>
              <span>Time</span>
              <span>Distance</span>
            </>
          )}
          <span>Action</span>
        </div>

        {exercise.sets.map((set, index) => (
          <SetItem
            key={index}
            set={set}
            exercise={exercise}
            dispatch={dispatch}
            index={index}
          />
        ))}

        <button
          type='button'
          className={styles.addSetButton}
          onClick={() =>
            dispatch({
              type: 'addSet',
              payload: { exerciseId: exercise.id },
            })
          }
        >
          <FontAwesomeIcon icon={faSquareCheck} /> Add Set
        </button>
      </div>
    </div>
  );
}
