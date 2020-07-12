const express = require('express');
const { authorize } = require('../Middleware/index');
const Role = require('../Middleware/role');
const { getEmployers } = require('../Controllers/admin');

const router = express.Router();

router.get(
  '/employers',
  authorize([Role.Admin, Role.SuperAdmin]),
  getEmployers,
);

module.exports = router;
