import styles from './SetItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';

export default function SetItem({ set, exercise, dispatch, index }) {
  const isStrength = exercise.type === 'strength';
  const unitPlaceholder = isStrength ? 'Reps' : 'Time';
  const quantityPlaceholder = isStrength ? 'Weight' : 'Distance';
  const quantityStep = isStrength ? '0.5' : '0.01';

  // Determine if this set is complete
  const isComplete = set.isComplete || false;

  return (
    <div
      className={`${styles.setItem} ${
        isComplete ? styles.completedSet : styles.incompleteSet
      }`}
    >
      <div className={styles.setNumber}>{index + 1}</div>

      {/* First input field - Reps or Time */}
      <div className={styles.inputField}>
        <input
          type='number'
          id={`${isStrength ? 'reps' : 'time'}-${exercise.id}-${index}`}
          name={isStrength ? 'reps' : 'time'}
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
          placeholder={unitPlaceholder}
          min='0'
          aria-label={`${unitPlaceholder} for set ${index + 1}`}
          disabled={isComplete}
        />
      </div>

      {/* Second input field - Weight or Distance */}
      <div className={styles.inputField}>
        <input
          type='number'
          id={`${isStrength ? 'weight' : 'distance'}-${exercise.id}-${index}`}
          name={isStrength ? 'weight' : 'distance'}
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
          placeholder={quantityPlaceholder}
          min='0'
          step={quantityStep}
          aria-label={`${quantityPlaceholder} for set ${index + 1}`}
          disabled={isComplete}
        />
      </div>

      <div className={styles.setBtn}>
        <button
          type='button'
          className={`${styles.completeSetButton} ${
            isComplete ? styles.completedButton : styles.incompleteButton
          }`}
          onClick={() =>
            dispatch({
              type: 'completeSet',
              payload: {
                exerciseId: exercise.id,
                setIndex: index,
              },
            })
          }
          aria-label={`Complete set ${index + 1}`}
        >
          <FontAwesomeIcon icon={faCheck} />
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
          aria-label={`Delete set ${index + 1}`}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
}
