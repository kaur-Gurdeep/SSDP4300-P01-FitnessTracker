// Requires and configs
const express = require('express');
const UserController = require('../controllers/UserController');

// Express and Controllers
const userRouter = express.Router();

userRouter.get('/', UserController.Users);
userRouter.get('/:userId', UserController.User);

module.exports = userRouter;
