const express = require('express');

const { body } = require('express-validator');

const appRoute = express.Router();

const authController = require('../../../Controllers/auth');

const { employerSignIn } = require('../../../Controllers/views/employer/auth');
const { employerSignup } = require('../../../Controllers/views/employer/auth');

appRoute.get('/employer-sign-in', employerSignIn);
appRoute.get('/employer-sign-up', employerSignup);
appRoute.post(
  '/employer-sign-in',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address.')
      .normalizeEmail(),
    body('password', 'Password has to be valid.')
  ],
  authController.postEmployerLogin,
);
module.exports = appRoute;
