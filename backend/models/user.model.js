const mongoose = require("mongoose");

// Define the User Schema
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
          
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Create and export the User Model
const User = mongoose.model("User", userSchema);

module.exports = User;
