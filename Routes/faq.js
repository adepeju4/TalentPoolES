/* eslint-disable eol-last */
const express = require('express');
const faqController = require('../Controllers/faq/faq');
const { authorize } = require('../Middleware/index');
const Role = require('../Middleware/role');

const router = express.Router();
// Create FAQ
router.post('/faq', authorize(Role.Admin), faqController.createfaq);
// View all FAQs
router.get('/faq', authorize(Role.Admin), faqController.getAllFaqs);
// Get FAQ By ID
router.get('/faq/:id', authorize(Role.Admin), faqController.getfaq);
// Update FAQs
router.patch('/faq/:id', authorize(Role.Admin), faqController.updateFaq);
module.exports = router;
