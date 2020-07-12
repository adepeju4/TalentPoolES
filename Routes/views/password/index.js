const express = require('express');
const appRoute = express.Router();

const {
  passwordOTP,
  passwordReset,
  passwordSuccess,
  recoverPassword,
  updatePassword,
} = require('../../../Controllers/views/password/password');

appRoute.get('/password-otp', passwordOTP);
appRoute.get('/password-reset', passwordReset);
appRoute.get('/password-success', passwordSuccess);
appRoute.get('/recover-password', recoverPassword);
appRoute.get('/update-password', updatePassword);

module.exports = appRoute;
