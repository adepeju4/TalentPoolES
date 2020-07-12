const express = require('express');

const router = express.Router();
const {
  employerUpgrade,
} = require('../../Controllers/employer/employer-upgrade');

// search employees by employer id
router.patch('/upgrade/:employer_id', employerUpgrade);

module.exports = router;
