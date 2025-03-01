const jwt = require('jsonwebtoken');
const User = require( '../models/User');

const authMiddleware = async (req, res, next) => {

    if (req.path === '/api/auth/login' || req.path === '/api/auth/signup') {
        return next(); // Skip authentication for login and signup
    }

    const token = req.header("Authorization")?.split(" ")[1]; // Extract token from Bearer
    if (!token) return res.status(401).json({ message: "Unauthorized: No token provided" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password"); // Attach user info to req
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

module.exports = authMiddleware;