import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.model.js";
dotenv.config({quiet : true});

export const isAuthenticated = async (req, res, next)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message: "User is not authenticated",
                success: false,
            })
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if(!decoded){
            return res.status(401).json({
                message: "Token is expired",
                success: false,
            })
        }
        const user = await User.findById(decoded.userId);
        if(!user){
            return res.status(400).json({
                message: "No user found",
                success: false,
            })
        }
        req.id = user._id;
        next();
    }catch(error){
        return res.status(400).json({
            message: "Server error",
            success: false,
        })
    }
}