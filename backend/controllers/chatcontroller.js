const Chat = require('../models/chat');

async function accesschat(req, res) {

    // this is the target user id coming from frontend
    const { userId } = req.body;


    // if no target userid is passed give this error message
    if (!userId) {
        return res.status(401).json({
            message: 'userId not provided'
        })
    }

    try {

        // checking if chat already exists by searching the database where both persons
        //  userid is present and then it populates user data but excludes passwords
        let chat = await Chat.findOne({
            users: { $all: [req.user._id, userId] },
        }).populate('users', '-password');

        // if chat exists send it to the frontend
        if (chat) {
            return res.json({ chat });
        }

        // creating a new chat if not found 
        const newchat = await Chat.create({
            users: [req.user._id, userId],
        });

        // fetching the newly created chat with full user data of both users
        const fullchat = await Chat.findById(newchat._id).populate('users', '-password');
        res.status(201).json({
            message: 'new chat created',
            fullchat
        });
    } catch (error) {            // error handling when anything like db or something fails
        console.log(error);
        res.status(500).json({
            message: 'something went wrong'
        });
    }
}


// function to fetch current logged in user chats from database

async function fetchchat(req, res) {

    try {

        
        const chats = await Chat
            .find({ users: req.user._id })        // we are telling mongoose that give me all chats where the user array contains this user ID
            .populate('users', '-password')    // populate the user details except password
            .sort('-updateAt');                  // sort the chats according to most recently updated chat

        res.status(200).json({ chats })
    } catch (error) {
        res.status(500).json({
            message: 'something went wrong'
        })
    }
}

module.exports = { accesschat, fetchchat };