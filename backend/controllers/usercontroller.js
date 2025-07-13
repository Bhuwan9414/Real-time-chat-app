const User = require('../models/users')
const generatetoken = require('../config/generatetoken');

async function registeruser(req, res){

    // taking the input from the client
    const {name, email, password} = req.body;

    // if any input field is missing then show this message
    if(!name || !email || !password){
        return res.status(400).send("please fill all the fields");
    }

    // checking if user already exists
    const userexists = await User.findOne({ email });

    if(userexists){
        return res.status(400).send("user already exists");
    }

    const user = await User.create({
        name,
        email,
        password
    });

    res.status(201).json({
        id : user._id,
        name : user.name,
        email : user.email,
        token: generatetoken(user._id)
    })
}

module.exports = {registeruser};