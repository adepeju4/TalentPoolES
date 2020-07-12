const express = require('express');
const { verifyEmployee } = require('../../Controllers/admin/verify-employee');
const { authorize } = require('../../Middleware/index');
const Role = require('../../Middleware/role');

const router = express.Router();

// Update user verification status
router
  .route('/verify-employee/:employee_id', authorize([Role.Admin, Role.SuperAdmin]))
  .patch(verifyEmployee);

module.exports = router;
