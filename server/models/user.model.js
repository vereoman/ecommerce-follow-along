const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address'],
        },
        name: {
            type: String
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            validate: {
                validator: validatePassword,
                message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character'
            }
        },
        isSeller: {
            type: Boolean,
            default: false
        },
        imageUrl: {  
            type: String
        },
        cloudinaryId: {
            type: String
        }
    }
);

function validatePassword (password) {
    return (
        /[A-Z]/.test(password) && 
        /[a-z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[!@#$%^&*(){}<>?]/.test(password)
    )
}

module.exports = mongoose.model('User', userSchema);