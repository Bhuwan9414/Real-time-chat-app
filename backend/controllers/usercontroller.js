const User = require('../models/users')
const generatetoken = require('../config/generatetoken');

// this is the function for registering the user
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

    // create the user and store in database
    const user = await User.create({
        name,
        email,
        password
    });

    // return the below details of the user created 
    res.status(201).json({
        id : user._id,
        name : user.name,
        email : user.email,
        token: generatetoken(user._id)
    })
}


// function for user login

async function loginuser(req,res){

    const{email, password} = req.body;

    const user = await User.findOne({email});

    if(user && user.password === password){
        res.status(201).json({
            message : 'login successfull',
            token : generatetoken(user._id)
        })
    }
    else{
        res.status(401).json({
            message : 'invalid credentials'
        })
    }

}

async function fetchusers(req,res){

    try{
        const allusers = await User.find();
        res.json(allusers);
    } catch(error){
        res.status(401).json({
            message : 'failed to fetch users'
        })
    }

}

module.exports = {registeruser, loginuser, fetchusers};