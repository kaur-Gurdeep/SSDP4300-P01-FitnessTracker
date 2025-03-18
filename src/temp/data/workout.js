const initialWorkoutData = [
  {
    id: 1,
    date: '2025-03-16',
    name: 'Workout 1',
    exercises: [
      {
        id: 'bench-press',
        name: 'Bench Press',
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
        id: 'squats',
        name: 'Squats',
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
        id: 'running',
        name: 'Running',
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
  },
  {
    id: 2,
    date: '2025-03-17',
    name: 'Workout 2',
    exercises: [
      {
        id: 'bench-press',
        name: 'Bench Press',
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
        id: 'swimming',
        name: 'Swimming',
        type: 'cardio',
        duration: 30,
        sets: [
          {
            distance: 300,
            time: 120,
          },
          {
            distance: 200,
            time: 100,
          },
          {
            distance: 200,
            time: 110,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    date: '2025-03-18',
    name: 'Workout 3',
    exercises: [],
  },
  {
    id: 4,
    date: '2025-03-19',
    name: 'Workout 4',
    exercises: [],
  },
];

export { initialWorkoutData };
