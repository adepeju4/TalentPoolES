const express = require('express');
const messageController = require('../Controllers/chat');

const router = express.Router();
// get all users admin and employers can communicate with -(all users)
router.get('/chat-users', messageController.chatUsers);
router.get('/:senDerId/:receiVerID', messageController.chatMessages);

module.exports = router;
