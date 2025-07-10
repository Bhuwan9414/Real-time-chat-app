const mongoose = require('mongoose');


// async function to connect to mongodb
const connectDB = async function () {

    // 
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('mongoDB connected');
    }
    // catch if any failure occurs and exit the process by giving a error message
    catch (error) {
        console.error('mongodb connection failed : ', error.message);
        process.exit(1);
    }

}