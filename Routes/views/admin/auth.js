const express = require('express');
const appRoute = express.Router();

const {
  adminSignUp,
  adminLogin,
} = require('../../../Controllers/views/admin/auth');

appRoute.get('/admin-signup', adminSignUp);
appRoute.get('/admin-login', adminLogin);

module.exports = appRoute;
