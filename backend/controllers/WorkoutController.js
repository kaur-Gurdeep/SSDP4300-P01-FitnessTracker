require('dotenv').config();
const axios = require('axios');

// all workouts for Admin
exports.Workouts = async function (req, res) {
  const workouts = require('../data/workout.json');
  res.json(workouts);
};

// all workout for a user
exports.WorkoutByUser = async function (req, res, next) {
  const userId = req.params.userId;
  const workouts = await require('../data/workout.json').filter((workout) => workout.userId === userId);
  res.json(workouts);
};
