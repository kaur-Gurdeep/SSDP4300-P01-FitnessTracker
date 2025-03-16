import styles from './WorkoutCard.module.css';

const workout = {
  id: 1,
  date: '2025-03-16',
  name: 'Workout 1',
  duration: 30,
  exercises: [],
};

export default function WorkoutCard() {
  return (
    <div className={styles.workoutCard}>
      <div className={styles.workoutHeader}>
        <h3>{workout.name}</h3>
        <p>{workout.date}</p>
      </div>
    </div>
  );
}
