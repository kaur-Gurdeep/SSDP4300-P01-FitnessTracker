require('dotenv').config();
const axios = require('axios');

// all workouts for Admin
exports.Workouts = async function (req, res) {};

// all workout for a user
exports.WorkoutByUser = async function (req, res, next) {
  const workouts = require('../data/workout.json');
};
