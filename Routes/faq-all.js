/* eslint-disable eol-last */
const express = require('express');
const faqController = require('../Controllers/faq/faq');

const router = express.Router();

router.get('/faq', faqController.getAllFaqs);

module.exports = router;
