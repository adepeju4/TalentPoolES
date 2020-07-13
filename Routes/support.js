const express = require('express');
const { createSupport } = require('../controllers/support');

const router = express.Router();
router.post('/support', createSupport);

module.exports = router;
