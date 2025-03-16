// Requires and configs
const express = require('express');
const ExerciseController = require('../controllers/ExerciseController');

// Express and Controllers
const exerciseRouter = express.Router();

exerciseRouter.get('/', ExerciseController.Exercises);
exerciseRouter.get('/:name', ExerciseController.Exercise);
// exerciseRouter.get('/:name{/:type}{/:muscle}{/:difficulty}', ExerciseController.Exercise);
// exerciseRouter.get('/:name/:type?/:muscle?/:difficulty?', ExerciseController.Exercise);

module.exports = exerciseRouter;
