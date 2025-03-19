import styles from './ExerciseItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import SetItem from '../../Set/SetItem/SetItem';
import { useState } from 'react';

export default function ExerciseItem({ exercise, onRemove }) {
  const [exerciseData, setExerciseData] = useState(exercise);
  return (
    <div className={styles.exerciseItem}>
      <div className={styles.exerciseHeader}>
        <span>{exerciseData.name}</span>
        <button type='button' onClick={() => onRemove(exerciseData.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
      <div className={styles.setsContainer}>
        <div className={styles.setHeader}>
          {exerciseData.type === 'Strength' && (
            <div>
              <span>Set</span>
              <span>Reps</span>
              <span>Weight</span>
            </div>
          )}
          {exerciseData.type === 'Cardio' && (
            <div>
              <span>Set</span>
              <span>Time</span>
              <span>Distance</span>
            </div>
          )}
        </div>

        {exerciseData.sets.length === 0 && (
          <SetItem
            set={{}}
            exerciseType={exerciseData.type}
            onUpdate={(newSet) => {
              const newSets = [...exerciseData.sets];
              newSets.push(newSet);
              setExerciseData({ ...exerciseData, sets: newSets });
            }}
            index={0}
          />
        )}
        {exerciseData.sets.map((set, index) => (
          <SetItem
            key={index}
            set={set}
            exerciseType={exerciseData.type}
            onUpdate={(newSet) => {
              const newSets = [...exerciseData.sets];
              newSets[index] = newSet;
              setExerciseData({ ...exerciseData, sets: newSets });
            }}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
