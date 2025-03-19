import styles from './SetItem.module.css';
import { useState } from 'react';

export default function SetItem({ set, exerciseType, onUpdate, index }) {
  const [setData, setSetData] = useState(set);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSetData({ ...setData, [name]: Number(value) });
  };

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
              value={setData.reps || ''}
              onChange={handleInputChange}
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
              value={setData.weight || ''}
              onChange={handleInputChange}
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
              value={setData.distance || ''}
              onChange={handleInputChange}
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
              value={setData.time || ''}
              onChange={handleInputChange}
              placeholder='Time'
              min='0'
            />
          </div>
        </td>
      )}
    </tr>
  );
}
