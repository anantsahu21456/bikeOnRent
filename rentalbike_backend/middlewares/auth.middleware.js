import asyncHandler from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';
import { User } from '../models/User.models.js';

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // Retrieve token from either cookies or Authorization header
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    console.log("Received token:", token);
    console.log("Cookies:", req.cookies);
    console.log("Authorization Header:", req.header("Authorization"));

    if (!token) {
      console.log("No token provided. Cookies:", req.cookies, "Headers:", req.headers);
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    // Verify the JWT token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decodedToken?._id) {
      return res.status(401).json({ error: "Unauthorized: Invalid token payload" });
    }
    // Fetch the user based on the decoded token's ID
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

    if (!user) {
      return res.status(401).json({ error: "Unauthorized: Invalid access token" });
    }

    // Attach the user to the request object
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Handle any errors that occur during the process
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: "Unauthorized: Token has expired" });
    }
    else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    } else if (error.name === 'NotBeforeError') {
      return res.status(401).json({ error: "Unauthorized: Token not active" });
    }
    console.error(error);
    res.status(401).json({ error: "Unauthorized: Token verification failed" });
  }
});
