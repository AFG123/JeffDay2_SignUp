const mongoose = require('mongoose');
const connectDB = async function(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully");
        console.log("Connected DB:", mongoose.connection.name);
    }catch(err){
        console.error("Database connection failed", err);
    }
}

module.exports = connectDB;