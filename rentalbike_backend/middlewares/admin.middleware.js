import jwt from 'jsonwebtoken';
import { User } from '../models/User.models.js'; // Assuming your User model has roles or user info

const admin = async (req, res, next) => {
    let token;

    // Check if the token is provided in the request header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Check if the user has the admin role
            const user = await User.findById(decoded.id);

            if (!user || user.role !== "admin") {
                return res.status(403).json({ message: "You are not authorized to access this resource" });
            }

            // Attach user info to request
            req.user = user;
            next();

        } catch (error) {
            return res.status(401).json({ message: "Not authorized, invalid token" });
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};

export { admin };
