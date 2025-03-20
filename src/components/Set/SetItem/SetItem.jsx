import styles from './SetItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSquareCheck } from '@fortawesome/free-solid-svg-icons';

export default function SetItem({ set, exercise, dispatch, index }) {
  return (
    <div className={styles.setItem}>
      <div className={styles.setNumber}>Set {index + 1}</div>

      {/* First input field - Reps or Time */}
      <div className={styles.inputField}>
        <input
          type='number'
          id={`${exercise.type === 'Strength' ? 'reps' : 'time'}-${index}`}
          name={exercise.type === 'Strength' ? 'reps' : 'time'}
          value={set.unit || ''}
          onChange={(e) =>
            dispatch({
              type: 'updateSet',
              payload: {
                exerciseId: exercise.id,
                setIndex: index,
                field: 'unit',
                value: e.target.value,
              },
            })
          }
          placeholder={exercise.type === 'Strength' ? 'Reps' : 'Time'}
          min='0'
        />
      </div>

      {/* Second input field - Weight or Distance */}
      <div className={styles.inputField}>
        <input
          type='number'
          id={`${
            exercise.type === 'Strength' ? 'weight' : 'distance'
          }-${index}`}
          name={exercise.type === 'Strength' ? 'weight' : 'distance'}
          value={set.quantity || ''}
          onChange={(e) =>
            dispatch({
              type: 'updateSet',
              payload: {
                exerciseId: exercise.id,
                setIndex: index,
                field: 'quantity',
                value: e.target.value,
              },
            })
          }
          placeholder={exercise.type === 'Strength' ? 'Weight' : 'Distance'}
          min='0'
          step={exercise.type === 'Strength' ? '0.5' : '0.01'}
        />
      </div>

      <div className={styles.setBtn}>
        <button
          type='button'
          className={styles.completeSetButton}
          onClick={() =>
            dispatch({
              type: 'completeSet',
              payload: {
                exerciseId: exercise.id,
                setIndex: index,
              },
            })
          }
        >
          <FontAwesomeIcon icon={faSquareCheck} />
        </button>
        <button
          type='button'
          className={styles.deleteButton}
          onClick={() =>
            dispatch({
              type: 'removeSet',
              payload: {
                exerciseId: exercise.id,
                setIndex: index,
              },
            })
          }
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
}
