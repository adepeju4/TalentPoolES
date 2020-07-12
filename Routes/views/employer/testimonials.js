const express = require('express');
const appRoute = express.Router();

const {
  testimonials,
} = require('../../../Controllers/views/employer/testimonials');

appRoute.get('/testimonials', testimonials);

module.exports = appRoute;
