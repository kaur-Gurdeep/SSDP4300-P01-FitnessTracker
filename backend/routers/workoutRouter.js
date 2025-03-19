// Requires and configs
const express = require('express');
const WorkoutController = require('../controllers/WorkoutController');

// Express and Controllers
const workoutRouter = express.Router();

workoutRouter.get('/', WorkoutController.Workouts);
workoutRouter.get('/:userId', WorkoutController.WorkoutByUser);

module.exports = workoutRouter;
