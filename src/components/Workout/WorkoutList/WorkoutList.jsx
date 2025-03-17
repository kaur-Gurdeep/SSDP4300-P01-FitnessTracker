import WorkoutCard from '../WorkoutCard/WorkoutCard';
import styles from './WorkoutList.module.css';

export default function WorkoutList() {
  return (
    <div className={styles.workoutList}>
      <WorkoutCard />
    </div>
  );
}
