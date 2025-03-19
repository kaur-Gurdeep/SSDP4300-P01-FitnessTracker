// Requires and configs
const express = require('express');
const ExerciseController = require('../controllers/ExerciseController');

// Express and Controllers
const exerciseRouter = express.Router();

exerciseRouter.get('/ninjas/', ExerciseController.APIExercises);
exerciseRouter.get('/ninjas/:name', ExerciseController.APIExercise);
exerciseRouter.get('/:exerciseId', ExerciseController.Exercise);
exerciseRouter.get('/type/:exerciseType', ExerciseController.ExercisesByType);
// exerciseRouter.get('/:name{/:type}{/:muscle}{/:difficulty}', ExerciseController.Exercise);
// exerciseRouter.get('/:name/:type?/:muscle?/:difficulty?', ExerciseController.Exercise);

module.exports = exerciseRouter;
