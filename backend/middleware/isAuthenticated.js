import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.model.js";
dotenv.config({ quiet: true });

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User is not authenticated",
        success: false,
      });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
   
    req.id = decoded.userId;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired",
        success: false,
      });
    } else {
      return res.status(500).json({
        message: "Server error",
        success: false,
      });
    }
  }
};
