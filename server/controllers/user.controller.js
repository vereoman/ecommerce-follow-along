const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("../config/cloudinary");
const fs = require("fs").promises;

const Signup = async function (req, res) {
    try {
        const { email, password, isSeller } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            isSeller: isSeller,
        });

        await newUser.save();

        res.status(201).json({
            message: "User created successfully",
            user: {
                email: newUser.email,
                isSeller: newUser.isSeller,
            },
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
};

const Login = async function (req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+isSeller");
        if (!user) {
            return res
                .status(400)
                .json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                isSeller: user.isSeller,
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                email: user.email,
                isSeller: user.isSeller,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
};

const verifyToken = async function (req, res) {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res
                .status(401)
                .json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res
                .status(404)
                .json({ message: "User not found" });
        }

        res.status(200).json({
            user: {
                email: user.email,
                isSeller: user.isSeller,
            },
        });
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

const uploadProfilePhoto = async function (req, res) {
    try {
        if (!req.file) {
            return res
                .status(400)
                .json({ message: "No file uploaded" });
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "profile_photos",
            width: 300,
            height: 300,
            crop: "fill",
        });

        await fs.unlink(req.file.path);

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { imageUrl: result.secure_url },
            { new: true }
        ).select("-password");

        res.status(200).json({
            message: "Profile photo uploaded successfully",
            imageUrl: result.secure_url,
        });
    } catch (error) {
        if (req.file && req.file.path) {
            await fs.unlink(req.file.path).catch(console.error);
        }

        console.error("Upload error:", error);
        res.status(500).json({
            message: "Error uploading profile photo",
            error: error.message,
        });
    }
};

module.exports = { Signup, Login, verifyToken, uploadProfilePhoto };