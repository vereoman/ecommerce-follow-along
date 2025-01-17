const mongoose = require('mongoose');

// Database Connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://admin:admin@cluster0.o7aj0.mongodb.net/eom");
        console.log("MongoDB Connected:" );
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit the process with failure
    }
};
// Export the function
module.exports = connectDB;