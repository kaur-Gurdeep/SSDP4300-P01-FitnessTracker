const initialWorkoutData = {
  id: 1,
  date: '2025-03-16',
  name: 'Workout 1',
  exercises: [
    {
      id: 1,
      name: 'Exercise 1',
      type: 'strength',
      duration: 30,
      sets: [
        {
          reps: 10,
          weight: 100,
        },
        {
          reps: 10,
          weight: 100,
        },
        {
          reps: 10,
          weight: 100,
        },
      ],
    },
    {
      id: 2,
      name: 'Exercise 2',
      type: 'strength',
      duration: 30,
      sets: [
        {
          reps: 10,
          weight: 100,
        },
        {
          reps: 10,
          weight: 100,
        },
        {
          reps: 10,
          weight: 100,
        },
      ],
    },
    {
      id: 3,
      name: 'Exercise 3',
      type: 'cardio',
      duration: 30,
      sets: [
        {
          distance: 1000,
          time: 30,
        },
        {
          distance: 2000,
          time: 30,
        },
        {
          distance: 1000,
          time: 30,
        },
      ],
    },
  ],
};

export { initialWorkoutData };
