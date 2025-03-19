import styles from './ExerciseItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import SetItem from '../../Set/SetItem/SetItem';
import { useState } from 'react';

export default function ExerciseItem({ exercise, onRemove }) {
  const [sets, setSets] = useState(exercise.sets || [createInitialSet()]);

  function createInitialSet() {
    if (exercise.type === 'Strength') {
      return { reps: 0, weight: 0 };
    } else if (exercise.type === 'Cardio') {
      return { time: 0, distance: 0 };
    }
  }

  return (
    <div className={styles.exerciseItem}>
      <div className={styles.exerciseHeader}>
        <span>{exercise.name}</span>
        <button type='button' onClick={() => onRemove(exercise.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
      <table className={styles.setsContainer}>
        <thead className={styles.setHeader}>
          {exercise.type === 'Strength' && (
            <tr>
              <th>Set</th>
              <th>Reps</th>
              <th>Weight</th>
            </tr>
          )}
          {exercise.type === 'Cardio' && (
            <tr>
              <th>Set</th>
              <th>Time</th>
              <th>Distance</th>
            </tr>
          )}
        </thead>

        {sets.length === 0 && (
          <SetItem
            set={{}}
            exerciseType={exercise.type}
            onUpdate={(newSet) => {
              const newSets = [...sets];
              newSets.push(newSet);
              setSets(newSets);
            }}
            index={0}
          />
        )}
        {sets.map((set, index) => (
          <SetItem
            key={index}
            set={set}
            exerciseType={exercise.type}
            onUpdate={(newSet) => {
              const newSets = [...sets];
              newSets[index] = newSet;
              setSets(newSets);
            }}
            index={index}
          />
        ))}
      </table>
    </div>
  );
}
