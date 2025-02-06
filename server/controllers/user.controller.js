const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Signup = async function (req, res) {
    try {
        const { email, password, isSeller } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user with explicit isSeller value
        const newUser = new User({
            email,
            password: hashedPassword,
            isSeller: isSeller // This ensures the isSeller value from frontend is used
        });

        await newUser.save();

        // Return response without sensitive data
        res.status(201).json({
            message: 'User created successfully',
            user: {
                email: newUser.email,
                isSeller: newUser.isSeller // Explicitly include isSeller in response
            }
        });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
};

const Login = async function (req, res) {
    try {
        const { email, password } = req.body;

        // Find user and explicitly select isSeller field
        const user = await User.findOne({ email }).select('+isSeller');
        if (!user) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }

        // Generate JWT Token with isSeller claim
        const token = jwt.sign(
            { 
                userId: user._id,
                isSeller: user.isSeller // Ensure isSeller is included in token
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '7d' }
        );

        // Return response with user role
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                email: user.email,
                isSeller: user.isSeller // Explicitly include isSeller in response
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
};

// Add a utility function to verify tokens
const verifyToken = async function (req, res) {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            user: {
                email: user.email,
                isSeller: user.isSeller
            }
        });

    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = { Signup, Login, verifyToken };