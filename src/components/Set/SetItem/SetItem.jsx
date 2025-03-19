import styles from './SetItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function SetItem({
  set,
  exerciseType,
  updateSet,
  removeSet,
  index,
}) {
  return (
    <tr className={styles.setItem}>
      <td className={styles.setNumber}>Set {index + 1}</td>

      {exerciseType === 'Strength' ? (
        // Strength exercise fields
        <td className={styles.setFields}>
          <div className={styles.inputGroup}>
            <label htmlFor={`reps-${index}`} hidden></label>
            <input
              type='number'
              id={`reps-${index}`}
              name='reps'
              value={set.unit || ''}
              onChange={updateSet}
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
              onChange={updateSet}
              placeholder='Weight'
              min='0'
              step='0.1'
            />
          </div>
        </td>
      ) : (
        // Cardio exercise fields
        <td className={styles.setFields}>
          <div className={styles.inputGroup}>
            <label htmlFor={`distance-${index}`} hidden></label>
            <input
              type='number'
              id={`distance-${index}`}
              name='distance'
              value={set.unit || ''}
              onChange={updateSet}
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
              onChange={updateSet}
              placeholder='Time'
              min='0'
            />
          </div>
        </td>
      )}

      <td>
        <button type='button' onClick={removeSet}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  );
}
