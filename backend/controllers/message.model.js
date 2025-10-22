import { User } from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config({quiet : true});

export const getAllChats = async (req, res) => {
    try{
        const userId = req.id;
        const users = await User.find({ _id: { $ne: userId }}).select("-password -email");
        if(users.length === 0){
            return res.status(400).json({
                message: "No User found",
                success: false,
            })
        }
        return res.status(200).json({
            message: "All User found Successfully",
            users,
            success: true,
        });
    }catch(error){
        return res.status(401).json({
            message: "Server error",
            success: false,
        })
    }
}