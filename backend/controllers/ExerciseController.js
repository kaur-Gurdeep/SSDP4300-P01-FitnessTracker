require('dotenv').config();
const axios = require('axios');
// const { urlencoded } = require('express');

// API Ninjas
const API_NINJAS_URL = process.env.API_NINJAS_URL;
const X_API_KEY = process.env.X_API_KEY;

// Get exact name match
function getExactExerciseNameMatch(exercises, name) {
  if (exercises.length === 0) {
    return [];
  } else {
    const exercise = exercises.find((exercise) => exercise.name.toLowerCase() === name.toLowerCase() || null);
    return exercise;
  }
}

// Get all exercises (max 10 without premium)
exports.Exercises = async function (req, res) {
  const exercises = await axios.get(API_NINJAS_URL, { headers: { 'X-Api-Key': X_API_KEY } });
  if (req.query.format === 'json') {
    res.json(exercises.data);
  } else {
    // Currently, only sends HTML as response
    res.send(`<h1>Exercises</h1><ul><li>${exercises.data[0].name} - ${exercises.data[0].muscle}</li><li>${exercises.data[1].name} - ${exercises.data[1].muscle}</li></ul>`);
  }
};

// Get an exercise by name
exports.Exercise = async function (req, res) {
  // name needs to be exact, API returns a list of exercises matching partially the name
  try {
    const name = req.params.name;
    // const type = req.params.type || '';
    // const muscle = req.params.muscle || '';
    // const difficulty = req.params.difficulty || '';

    // const exercises = await axios.get(`${API_NINJAS_URL}?name=${name}&type=${type}&muscle=${muscle}&difficulty=${difficulty}`, { headers: { 'X-Api-Key': X_API_KEY } });
    const exercises = await axios.get(`${API_NINJAS_URL}?name=${name}`, { headers: { 'X-Api-Key': X_API_KEY } });

    if (exercises) {
      const exercise = getExactExerciseNameMatch(exercises.data, name);
      if (!exercise) {
        return res.status(404).send('Exercise not found');
      }
      if (req.query.format === 'json') {
        return res.json(exercise);
      }
      // Currently, only sends HTML as response
      res.send(`<h1>${exercise.name}</h1><p>${exercise.instructions}</p>`);
    } else {
      throw new Error('No exercises found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
};
