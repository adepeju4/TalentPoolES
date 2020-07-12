const router = require('express').Router();
const { googleAuth } = require('../Controllers/googleAuth');

// new auth endpoint for google
router.post('/google', googleAuth);

module.exports = router;
