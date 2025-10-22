import { Message } from "../models/message.model.js";
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

export const sendMessage = async (req, res) =>{
    try{
        const senderId = req.id;
        const receiverId = req.params.id;
        const {message} = req.body;
        if(!senderId || !receiverId || !message){
            return res.status(400).json({
                success: false,
                message: "Something is missing",
            })
        }
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message,
        });

        return res.status(200).json({
            message: "Message sent successfully",
            success: true,
            newMessage,
        })
    }catch(error){
        return res.status(401).json({
            message: "Server error",
            success: false,
        })
    }
}