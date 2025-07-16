const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


dotenv.config();

// calling the connectdb function in db.js 
connectDB();

// making an express app
const app = express();
app.use(express.json());

// user routes
const userroutes = require('./routes/userroutes')
app.use('/api/user', userroutes);
app.use('/api/user', userroutes);
app.use('/api/user', userroutes);

// chat routes
const chatroutes = require('./routes/chatroutes');
app.use('/api/chat',chatroutes);


// storing the port no from .env into PORT variable
const PORT = process.env.PORT;

// creating a server
app.listen(PORT, function () {
    console.log(`server is runnning on port ${PORT}`);
})