const express = require('express');

const { body } = require('express-validator');

const authController = require('../../../Controllers/auth');
const signAuthController = require('../../../Controllers/employee/employee-signup');

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
      .withMessage('Please enter a valid email address')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 8 })
      .withMessage(
        'Password Incorrect)',
      )
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_`,/@#\-"=:;~<>'\$%\^&\*\?\|\+\(\)\[\]\{}\.])(?=.{8,})/,
      )
      .withMessage(
        'Password does not match required pattern',
      ),
  ],
  authController.postEmployeeLogin,
);

// Employee Register
appRoute.post(
  '/employee/register',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 8 })
      .withMessage(
        'Password should contain a minimum of 8 characters (upper and lowercase letters, numbers and at least one special character)',
      )
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_`,/@#\-"=:;~<>'\$%\^&\*\?\|\+\(\)\[\]\{}\.])(?=.{8,})/,
      )
      .withMessage(
        'Password should contain a minimum of 8 characters (upper and lowercase letters, numbers and at least one special character)',
      ),
  ],
  signAuthController.create,
);

module.exports = appRoute;
