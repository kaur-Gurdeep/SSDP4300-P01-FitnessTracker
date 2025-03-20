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
          {exercise.type === 'Strength' && (
            <div>
              <span>Set</span>
              <span>Reps</span>
              <span>Weight</span>
            </div>
          )}
          {exercise.type === 'Cardio' && (
            <div>
              <span>Set</span>
              <span>Time</span>
              <span>Distance</span>
            </div>
          )}
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
          onClick={() =>
            dispatch({
              type: 'addSet',
              payload: { exerciseId: exercise.id },
            })
          }
        >
          <FontAwesomeIcon icon={faSquareCheck} />
        </button>
      </div>
    </div>
  );
}
