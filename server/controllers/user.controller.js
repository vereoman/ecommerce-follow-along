const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("../config/cloudinary");

const Signup = async (req, res) => {
    try {
        const { email, password, isSeller } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            isSeller
        });

        await newUser.save();

        res.status(201).json({
            message: "User created successfully",
            user: { email: newUser.email, isSeller: newUser.isSeller }
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user._id, isSeller: user.isSeller },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: { email: user.email, isSeller: user.isSeller, imageUrl: user.imageUrl }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        let updateData = {};

        if (req.file) {
            const imageUrl = req.file.path;
            const cloudinaryId = req.file.filename;

            const existingUser = await User.findById(req.user._id);
            if (existingUser && existingUser.cloudinaryId) {
                await cloudinary.uploader.destroy(existingUser.cloudinaryId);
            }

            updateData.imageUrl = imageUrl;
            updateData.cloudinaryId = cloudinaryId;
        }

        if (email) {
            const existingEmailUser = await User.findOne({
                email,
                _id: { $ne: req.user._id }
            });
            if (existingEmailUser) {
                return res.status(400).json({ message: "Email already in use" });
            }
            updateData.email = email;
        }

        if (name) {
            updateData.name = name;
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            updateData,
            { new: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Profile updated", user: updatedUser });
    } catch (error) {
        console.error("Update profile error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { Signup, Login, updateProfile };
