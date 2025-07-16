const Chat = require('../models/chat');

async function accesschat(req, res) {

    const { userId } = req.body;

    if (!userId) {
        return res.status(401).json({
            message: 'userId not provided'
        })
    }

    try {

        // checking if chat already exists
        let chat = await Chat.findOne({
            users: { $all: [req.user._id, userId] },
        }).populate('users', '-password');

        if (chat) {
            return res.json({ chat });
        }

        // creating a new chat
        const newchat = await Chat.create({
            users: [req.user._id, userId],
        });

        
        const fullchat = await Chat.findById(newchat._id).populate('users', '-password');
        res.status(201).json({ fullchat });
    } catch (error){
        console.log(error);
        res.status(500).json({
            message : 'something went wrong'
        });
    }
}

module.exports = {accesschat};