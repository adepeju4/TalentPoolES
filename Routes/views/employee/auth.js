const express = require('express');

const { body } = require('express-validator');

const authController = require('../../../Controllers/auth');

const appRoute = express.Router();

const {
  employeeSignIn,
  employeeSignup,
} = require('../../../Controllers/views/employee/auth');

appRoute.get('/employee/login', employeeSignIn);
appRoute.get('/employee/register', employeeSignup);
appRoute.post(
  '/employee/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address.')
      .normalizeEmail(),
    body('password', 'Password has to be valid.')
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postEmployeeLogin,
);
module.exports = appRoute;
