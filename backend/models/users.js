const mongoose = require('mongoose');

// creating a user login and signup database schema
const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
});

module.exports = mongoose.model('User', userSchema);