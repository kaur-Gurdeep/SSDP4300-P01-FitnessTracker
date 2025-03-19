import styles from './SetItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function SetItem({
  set,
  exercise,
  updateSet,
  removeSet,
  index,
  exerciseIndex,
}) {
  return (
    <div className={styles.setItem}>
      <div className={styles.setNumber}>Set {index + 1}</div>

      {exercise.type === 'Strength' ? (
        // Strength exercise fields
        <div className={styles.setFields}>
          <div className={styles.inputGroup}>
            <label htmlFor={`reps-${index}`} hidden></label>
            <input
              type='number'
              id={`reps-${index}`}
              name='reps'
              value={set.unit || ''}
              onChange={(e) =>
                updateSet(exercise, index, {
                  ...set,
                  unit: e.target.value,
                })
              }
              placeholder='Reps'
              min='0'
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor={`weight-${index}`} hidden></label>
            <input
              type='number'
              id={`weight-${index}`}
              name='weight'
              value={set.quantity || ''}
              onChange={(e) =>
                updateSet(exercise, index, {
                  ...set,
                  quantity: e.target.value,
                })
              }
              placeholder='Weight'
              min='0'
              step='0.1'
            />
          </div>
        </div>
      ) : (
        // Cardio exercise fields
        <div className={styles.setFields}>
          <div className={styles.inputGroup}>
            <label htmlFor={`distance-${index}`} hidden></label>
            <input
              type='number'
              id={`distance-${index}`}
              name='distance'
              value={set.unit || ''}
              onChange={(e) =>
                updateSet(exercise, index, {
                  ...set,
                  unit: e.target.value,
                })
              }
              placeholder='Distance'
              min='0'
              step='0.01'
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor={`time-${index}`} hidden></label>
            <input
              type='number'
              id={`time-${index}`}
              name='time'
              value={set.quantity || ''}
              onChange={(e) =>
                updateSet(exercise, index, {
                  ...set,
                  quantity: e.target.value,
                })
              }
              placeholder='Time'
              min='0'
            />
          </div>
        </div>
      )}

      <div>
        <button type='button' onClick={() => removeSet(exerciseIndex, index)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
}
