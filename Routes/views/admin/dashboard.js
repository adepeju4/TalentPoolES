const express = require('express');
const appRoute = express.Router();

const {
  faq,
  employerMessages,
  messages,
  allEmployers,
  dashboard,
  adminVerification,
  adminSettings,
  adminEmployee,
  allEmployees,
  employeeReview,
  adminsList,
} = require('../../../Controllers/views/admin/dashboard');

appRoute.get('/admin-faq', faq);
appRoute.get('/admin-employer-messages', employerMessages);
appRoute.get('/admin-messages', messages);
appRoute.get('/admin-all-employers', allEmployers);
appRoute.get('/admin-dashboard', dashboard);
appRoute.get('/admin-verification', adminVerification);
appRoute.get('/admin-settings', adminSettings);
appRoute.get('/admin-all-employees', allEmployees);
appRoute.get('/employee-review', employeeReview);
appRoute.get('/admin-viewEmployee', adminEmployee);
appRoute.get('/admins-list', adminsList);

module.exports = appRoute;
