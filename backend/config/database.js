const mongoose = require('mongoose');

async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected...`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

module.exports = connectDB;