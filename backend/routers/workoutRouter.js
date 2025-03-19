// Requires and configs
const express = require('express');
const ExerciseController = require('../controllers/ExerciseController');

// Express and Controllers
const workoutRouter = express.Router();

workoutRouter.get('/', WorkoutController.Workouts);
workoutRouter.get('/:name', WorkoutController.Workout);

module.exports = exerciseRouter;
