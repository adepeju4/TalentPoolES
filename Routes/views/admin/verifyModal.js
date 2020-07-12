const express = require('express');
const appRoute = express.Router();

const { verifyModal } = require('../../../Controllers/views/admin/verifyModal');

appRoute.get('/verify-modal', verifyModal);

module.exports = appRoute;
