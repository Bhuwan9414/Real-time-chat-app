const express = require('express');
const router = express.Router();

const {accesschat, fetchchat} = require('../controllers/chatcontroller');
const { protect } = require('../middleware/authmiddleware');

// route for creating or accessing existing chats
router.post('/newchat', protect, accesschat);

// route for fetching all chats of a logged in user
router.get('/getchats', protect, fetchchat);



module.exports = router;