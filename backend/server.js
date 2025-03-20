// Requires and configs
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Express
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

// CORS setup
const cors = require('cors');
const corsOptions = {
  origin: ['http://localhost:5173'],
};
app.use(cors(corsOptions));

// AWS API Gateway
const PORT = process.env.PORT || 3000;
const API_GATEWAY_URL = process.env.API_GATEWAY_URL || 'http://localhost';

// Middleware

// Routes/routers
const exerciseRouter = require('./routers/exerciseRouter');
app.use('/exercises', exerciseRouter);
const userRouter = require('./routers/userRouter');
app.use('/users', userRouter);
const workoutRouter = require('./routers/workoutRouter');
app.use('/workouts', workoutRouter);

// Add fallback route

// Listen
app.listen(3000, () => {
  console.log(`Server listening on ${API_GATEWAY_URL}:${PORT}`);
});
