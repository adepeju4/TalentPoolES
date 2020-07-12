const express = require('express');
const employeeController = require('../../../Controllers/views/employee/dashboard');
const appRoute = express.Router();
const {
  employerDashboard,
} = require('../../../Controllers/views/employer/dashboard');

appRoute.get('/', (req, res) => {
  res.render('index', { variable: 'Hello Guys' });
});

appRoute.get('/employee-dashboard', employeeController.getEmployeeDash);
appRoute.get('/employee-messages', employeeController.getEmployeeMessages);
appRoute.get('/employee-profile', employeeController.getEmployeeProfile);
appRoute.get('/employee-profile/:id', employeeController.getEmployeeProfile);
appRoute.get('/employee-addTeam', employeeController.getEmployeeAddTeam);
appRoute.get('/employee-support', employeeController.getEmployeeSupport);
appRoute.get('/employee-settings', employeeController.getEmployeeSettings);
appRoute.get('/employee-employers', employeeController.getEmployeeEmployers);
appRoute.get(
  '/employee-profileCreation',
  employeeController.getEmployeeProfileCreation,
);
module.exports = appRoute;
