const express = require('express');
const appRoute = express.Router();

const {
  employeeSignIn,
  employeeSignup,
} = require('../../../Controllers/views/employee/auth');

appRoute.get('/employee-sign-in', employeeSignIn);
appRoute.get('/employee-sign-up', employeeSignup);

module.exports = appRoute;
