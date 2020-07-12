const express = require('express');
const appRoute = express.Router();

const { employerSignIn } = require('../../../Controllers/views/employer/auth');
const { employerSignup } = require('../../../Controllers/views/employer/auth');

appRoute.get('/employer-sign-in', employerSignIn);
appRoute.get('/employer-sign-up', employerSignup);

module.exports = appRoute;
