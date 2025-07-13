const express = require('express');

const { registeruser } = require('../controllers/usercontroller');

const router = express.Router();

// route for user creation
router.post('/register', registeruser);

module.exports = router;