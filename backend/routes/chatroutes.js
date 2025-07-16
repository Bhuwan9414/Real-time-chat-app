const express = require('express');
const router = express.Router();

const {accesschat} = require('../controllers/chatcontroller');

router.post('/', accesschat);

module.exports = router;