import WorkoutCard from '../WorkoutCard/WorkoutCard';
import styles from './WorkoutHistory.module.css';

export default function WorkoutHistory({ workouts = [] }) {
  const sortedWorkouts = [...workouts].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className={styles.workoutHistory}>
      {sortedWorkouts.map((workout) => (
        <WorkoutCard key={workout.id} workout={workout} />
      ))}
    </div>
  );
}
