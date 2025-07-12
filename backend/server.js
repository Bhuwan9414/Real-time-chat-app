const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

connectDB();
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.listen(PORT, function () {
    console.log(`server is runnning on port ${PORT}`);
})