require('dotenv').config();
const axios = require('axios');

// all workouts for Admin
exports.Workouts = async function (req, res) {
  const workouts = require('../data/workout.json');
  res.json(workouts);
};

// exports.WorkoutByUser = async function (req, res, next) {
//   let tempWorkouts = [];
//   let tempExercises = [];
//   let tempSets = [];

//   const userId = parseInt(req.params.userId);
//   const workouts = await require('../data/workout2.json').filter((workout) => workout.userId === userId);

//   workouts.forEach(async (workout) => {
//     workout.exercises.forEach(async (exerciseId) => {
//       const exercise = await require('../data/exercise.json').find((e) => e.id === exerciseId);

//       exercise.sets.forEach(async (setId) => {
//         const set = await require('../data/set.json').find((s) => s.id === setId);
//         tempSets.push(set);
//       });

//       exercise.sets = tempSets;
//       tempExercises.push(exercise);
//     });

//     workout.exercises = tempExercises;
//     tempWorkouts.push(workout);
//   });

//   // fullWorkout = workout;
//   // const workouts = await require('../data/workout.json').filter((workout) => workout.userId === userId);
//   res.json(tempWorkouts);
// };

exports.WorkoutByUser = async function (req, res, next) {
  const userId = parseInt(req.params.userId);

  // WILL NEED TO BE FETCHED ASYNC
  const workouts = require('../data/workout2.json').filter((workout) => workout.userId === userId);
  const exercisesData = require('../data/exercise.json');
  const setsData = require('../data/set.json');

  // create new fullworkout from fetched workouts
  const fullWorkouts = workouts.map((workout) => {
    const workoutExercises = workout.exercises.map((exerciseId) => {
      const exercise = exercisesData.find((e) => e.id === exerciseId);

      const exerciseSets = exercise.sets.map((setId) => setsData.find((s) => s.id === setId));

      // retunr spread to exercise
      return {
        ...exercise,
        sets: exerciseSets,
      };
    });

    // return spread to
    return {
      ...workout,
      exercises: workoutExercises,
    };
  });

  res.json(fullWorkouts);
};
