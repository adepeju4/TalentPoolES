/* eslint-disable camelcase */
const express = require('express');
const employer_controller = require('../../Controllers/employer/employer-dashboard');
const { authorize } = require('../../Middleware/index');
const Role = require('../../Middleware/role');

const route = express.Router();
route.get('/dashboard', authorize(Role.Employer), employer_controller.dashboard);
module.exports = route;
