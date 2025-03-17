import WorkoutCard from '../WorkoutCard/WorkoutCard';
import styles from './WorkoutSummary.module.css';

export default function WorkoutSummary() {
  return (
    <div className={styles.workoutSummary}>
      <WorkoutCard />
    </div>
  );
}
