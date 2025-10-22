import { json } from "express";
import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

export const getAllChats = async (req, res) => {
  try {
    const userId = req.id;
    const users = await User.find({ _id: { $ne: userId } }).select(
      "-password -email"
    );
    if (users.length === 0) {
      return res.status(400).json({
        message: "No User found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "All User found Successfully",
      users,
      success: true,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Server error",
      success: false,
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;
    if (!senderId || !receiverId || !message || senderId == receiverId) {
      return res.status(400).json({
        success: false,
        message: "Something is missing",
      });
    }
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(400).json({
        success: false,
        message: "Receiver not found",
      });
    }
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        allMessages: [newMessage._id],
      });
    } else {
      conversation.allMessages.push(newMessage._id);
      await conversation.save();
    }
    return res.status(200).json({
      message: "Message sent successfully",
      success: true,
      newMessage,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Server error",
      success: false,
    });
  }
};

export const getAllMessage = async (req, res) =>{
    try{
        const senderId = req.id;
        const receiverId = req.params.id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        }).populate("allMessages");
        if(!conversation){
            return res.status(400).json({
                success: false,
                message: "No conversation found",
            })
        }
        return res.status(200).json({
            success: true,
            messages: conversation.allMessages,
        })
    }catch(error){
        return json.status(400).json({
            message: "Server error",
        success: false,
        })
    }
}