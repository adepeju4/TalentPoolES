const express = require('express');

const {
  listAllEmployers,
  listAllEmployees,
} = require('../../Controllers/list/list-all');

const router = express.Router();
router.get(
  '/employer/all',
  listAllEmployers,
);
router.get(
  '/employee/all',
  listAllEmployees,
);

module.exports = router;
