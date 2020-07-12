const express = require('express');
const appRoute = express.Router();

const {
  topTalents,
} = require('../../../Controllers/views/employee/topTalents');

appRoute.get('/topTalents', topTalents);

module.exports = appRoute;
