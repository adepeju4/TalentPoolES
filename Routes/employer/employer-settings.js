const express = require('express');
const {
  createSupport,
  notificationSettings,
} = require('../../controllers/employer/employer-settings');

const router = express.Router();
router.post('/support', createSupport).patch('/notifications', notificationSettings);

module.exports = router;
