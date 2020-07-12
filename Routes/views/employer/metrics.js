const express = require('express');
const appRoute = express.Router();

const {
  employerMetrics,
} = require('../../../Controllers/views/employer/metrics');

appRoute.get('/employer-metrics', employerMetrics);

module.exports = appRoute;
