const express = require('express');
const router = express.Router();

const {accesschat} = require('../controllers/chatcontroller');
const { protect } = require('../middleware/authmiddleware');

router.post('/newchat', protect, accesschat);

module.exports = router;