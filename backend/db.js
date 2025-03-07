

const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};

module.exports = connectDB;
