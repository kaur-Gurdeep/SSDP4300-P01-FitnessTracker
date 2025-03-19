const initialWorkoutData = [
  {
    id: 1,
    date: '2025-03-16T10:30:00.000Z', // Morning workout
    name: 'Workout 1',
    exercises: [
      {
        id: 'bench-press',
        name: 'Bench Press',
        type: 'strength',
        duration: 30,
        sets: [
          {
            unit: 10,
            quantity: 100,
          },
          {
            unit: 10,
            quantity: 100,
          },
          {
            unit: 10,
            quantity: 100,
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
            unit: 10,
            quantity: 100,
          },
          {
            unit: 10,
            quantity: 100,
          },
          {
            unit: 10,
            quantity: 100,
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
            unit: 1000,
            quantity: 30,
          },
          {
            unit: 2000,
            quantity: 30,
          },
          {
            unit: 1000,
            quantity: 30,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    date: '2025-03-17T16:45:00.000Z', // Afternoon workout
    name: 'Workout 2',
    exercises: [
      {
        id: 'bench-press',
        name: 'Bench Press',
        type: 'strength',
        duration: 30,
        sets: [
          {
            unit: 10,
            quantity: 100,
          },
          {
            unit: 10,
            quantity: 100,
          },
          {
            unit: 10,
            quantity: 100,
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
            unit: 300,
            quantity: 120,
          },
          {
            unit: 200,
            quantity: 100,
          },
          {
            unit: 200,
            quantity: 110,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    date: '2025-03-18T07:15:00.000Z', // Early morning workout
    name: 'Workout 3',
    exercises: [],
  },
  {
    id: 4,
    date: '2025-03-19T19:30:00.000Z', // Evening workout
    name: 'Workout 4',
    exercises: [],
  },
];

export { initialWorkoutData };
