const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            console.warn("No token provided");
            return res.status(401).json({ message: "No token provided" });
        }
        
        console.log("Verifying token...");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: decoded.userId };

        console.log("Fetching user from database...");
        const user = await User.findById(decoded.userId);
        if (!user) {
            console.error("User not found:", decoded.userId);
            return res.status(404).json({ message: "User not found" });
        }
        
        req.user = user;
        next();
    } catch (error) {
        console.error("Auth middleware error:", error);
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;