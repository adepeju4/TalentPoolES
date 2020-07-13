const express = require('express');
const employeeViewController = require('../../../Controllers/views/employee/dashboard');
const employeeController = require('../../../Controllers/employee/employee-profile');

const appRoute = express.Router();
// Dashboard Route
appRoute.get(
  '/employee/dashboard/:employee_id',
  employeeController.getDashboard,
);
// Portfolio Page
// appRoute.get(
//   '/employee/portfolio',
//   employeeViewController.getEmployeePortfolio,
// );
// Get Employee Messages
appRoute.get('/employee/messages', employeeViewController.getEmployeeMessages);
// Create Profile
appRoute.get(
  '/employee/profile',
  employeeViewController.getEmployeeProfileCreation,
);
// Get Profile By Username -- No Page, use AXIOS then render data
appRoute.get('/employee/:username', employeeController.getProfileByUsername);
// Employee Support
appRoute.get('/employee/support', employeeViewController.getEmployeeSupport);
// Employee Settings
appRoute.get('/employee/settings', employeeViewController.getEmployeeSettings);
// Employee's Employers
appRoute.get(
  '/employee/employers',
  employeeViewController.getEmployeeEmployers,
);

module.exports = appRoute;
