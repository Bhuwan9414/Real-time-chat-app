const express = require('express');

const { registeruser, loginuser, fetchusers } = require('../controllers/usercontroller');

const router = express.Router();

// route for registering new user
router.post('/register', registeruser);

// route for login for existing user
router.post('/login', loginuser);

// route for fetching all users
router.get('/users',fetchusers);

module.exports = router;