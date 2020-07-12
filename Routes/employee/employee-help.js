const express = require('express');
const { authorize } = require('../../Middleware/index');
const Role = require('../../Middleware/role');
const {
  employeePostHelp,
} = require('../../Controllers/employee/employee-help');

const router = express.Router();

router.route('/help').post(authorize(Role.Employee), employeePostHelp);

module.exports = router;
