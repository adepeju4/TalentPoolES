const express = require('express');
const { authorize } = require('../../Middleware/index');
const Role = require('../../Middleware/role');
const { getEmployees } = require('../../Controllers/admin/ViewAllEmployees');

const router = express.Router();

router.get(
  '/viewAllEmployees',
  authorize([Role.Admin, Role.SuperAdmin]),
  getEmployees,
);

module.exports = router;
