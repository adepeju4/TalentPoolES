const express = require('express');

const { body } = require('express-validator');

const authController = require('../../../Controllers/auth');

const appRoute = express.Router();

const {
  adminSignUp,
  adminLogin,
} = require('../../../Controllers/views/admin/auth');

appRoute.get('/admin-signup', adminSignUp);
appRoute.get('/admin-login', adminLogin);
appRoute.post(
  '/admin-login',
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
  authController.adminLogin,
);

module.exports = appRoute;
