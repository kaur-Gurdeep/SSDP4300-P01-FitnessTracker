import WorkoutCard from '../WorkoutCard/WorkoutCard';
import styles from './WorkoutSummary.module.css';

export default function WorkoutSummary({ workout, dispatch }) {
  return (
    <div className={styles.workoutSummary}>
      <WorkoutCard workout={workout} dispatch={dispatch} />
    </div>
  );
}
