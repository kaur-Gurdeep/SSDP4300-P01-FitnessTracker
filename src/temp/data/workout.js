const initialWorkoutData = [
  // remove duration from exercises and add them to the workout objects (as seconds)
  {
    id: 1,
    date: '2025-03-16T10:30:00.000Z', // Morning workout
    name: 'Workout 1',
    duration: 3900,
    exercises: [
      {
        id: 'bench-press',
        name: 'Bench Press',
        type: 'strength',
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
    duration: 4400,
    exercises: [
      {
        id: 'bench-press',
        name: 'Bench Press',
        type: 'strength',
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
    duration: 4700,
    exercises: [
      {
        id: 'clean-jerk',
        name: 'Clean & Jerk',
        type: 'strength',
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
      {
        id: 'swimming',
        name: 'Swimming',
        type: 'cardio',
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
    id: 4,
    date: '2025-03-19T19:30:00.000Z', // Evening workout
    name: 'Workout 4',
    duration: 4300,
    exercises: [
      {
        id: 'bench-press',
        name: 'Bench Press',
        type: 'strength',
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
      {
        id: 'swimming',
        name: 'Swimming',
        type: 'cardio',
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
      {
        id: 'clean-jerk',
        name: 'Clean & Jerk',
        type: 'strength',
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
    ],
  },
];

export { initialWorkoutData };
