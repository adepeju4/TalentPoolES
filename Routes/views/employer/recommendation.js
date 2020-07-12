const express = require('express');
const appRoute = express.Router();

const {
  employerRecommendation,
} = require('../../../Controllers/views/employer/recommendation');

appRoute.get('/employer-recommendation', employerRecommendation);

module.exports = appRoute;
