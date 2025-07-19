const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({

    users: [
        {
            type: mongoose.Schema.Types.ObjectId,     // this means this field will store mongoDB objectid
            ref: 'User'                         // this tells mongoose that above objectID refers to the document in the USER collection
        }
    ],

},

    {
        timestamps: true
    }
);

const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat;