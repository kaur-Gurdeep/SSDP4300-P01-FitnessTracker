// Requires and configs
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Express
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

// AWS API Gateway
const PORT = process.env.PORT || 3000;
const API_GATEWAY_URL = process.env.API_GATEWAY_URL || 'http://localhost';

// Middleware

// Routes/routers
const exerciseRouter = require('./routers/exerciseRouter');
app.use('/exercises', exerciseRouter);

// Add fallback route

// Listen
app.listen(3000, () => {
  console.log(`Server listening on ${API_GATEWAY_URL}:${PORT}`);
});
