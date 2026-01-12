import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import dotenv from "dotenv";
import { io, onlineUsers } from "../server.js";


dotenv.config({ quiet: true });


export const getAllChats = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "No User found",
        success: false,
      });
    }
    const allUsers = await Conversation.findById(user.connectedUsers);
    if (!allUsers) {
      return res.status(400).json({
        message: "No Chats Found",
        success: false,
      });
    }

    await allUsers.populate({
      path: "participants",
      select: "profilePhoto username",
    });

    return res.status(200).json({
      message: "All User found Successfully",
      allUsers,
      success: true,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Server error",
      success: false,
    });
  }
};

export const addUser = async (req, res) => {
  try {
    const userId = req.id;
    const { phoneNumber } = req.body;

    if (!userId || !phoneNumber) {
      return res.status(400).json({
        message: "Something missing",
        success: false,
      });
    }



    const newUser = await User.findOne({ phoneNumber });
    if (!newUser) {
      return res.status(400).json({
        message: "No User Found",
        success: false,
      });
    }

    const newUserId = newUser._id;

    if (newUserId.equals(userId)) {
      return res.status(400).json({
        success: false,
        message: "You cannot add yourself",
      });
    }

    const user = await User.findById(userId);
    let conversation = await Conversation.findById(user.connectedUsers);
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [newUserId],
        allMessages: [],
      });
      user.connectedUsers = conversation._id;
      await user.save();
    } else {
      const exists = await Conversation.findOne({
        _id: user.connectedUsers,
        participants: newUserId,
      });
      if (exists)
        return res.status(400).json({
          message: "User already exists at chatlist.",
          success: true,
        });
      else conversation.participants.push(newUserId);
    }


    await conversation.save();

    return res.status(200).json({
      message: "New user added successfully",
      newUser: {
        _id: newUser._id,
        profilePhoto: newUser.profilePhoto,
        username: newUser.username,
      },
      success: true,
    });

  } catch (error) {
    return res.status(500).json({
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

    let sender = await User.findById(senderId).select("-password");
    let senderConversationId = sender.connectedUsers;

    if (!senderConversationId) {
      const newConversation = await Conversation.create({
        participants: [receiverId],
        allMessages: [newMessage._id]
      })
      sender.connectedUsers = newConversation._id;
    } else {
      await Conversation.findByIdAndUpdate(senderConversationId, {
        $push: {
          allMessages: newMessage._id
        },
        $addToSet: {
          participants: receiverId,
        }
      })
    }

    let receiverConversationId = receiver.connectedUsers;

    if (!receiverConversationId) {
      const newConversation = await Conversation.create({
        participants: [senderId],
        allMessages: [newMessage._id]
      })
      receiver.connectedUsers = newConversation._id;
      io.to(getSocketId(receiverId)).emit("New_Chat", sender);
    } else {
      const receiverConversation = await Conversation.findById(receiverConversationId);
      const isNewChat = !receiverConversation.participants.includes(senderId);

      if (isNewChat) {
        io.to(getSocketId(receiverId)).emit("New_Chat", sender);
      }

      await Conversation.findByIdAndUpdate(receiverConversationId, {
        $push: {
          allMessages: newMessage._id
        },
        $addToSet: {
          participants: senderId,
        }
      })
    }
    await receiver.save();
    await sender.save();

    io.to(getSocketId(receiverId)).emit("Msg from sender", newMessage);
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

function getSocketId(recieverId) {
  return onlineUsers[recieverId];
}

export const getAllMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;

    if (!senderId || !receiverId) {
      return res.status(400).json({
        success: false,
        message: "Something is missing",
      });
    }

    const sender = await User.findById(senderId);
    if (!sender || !sender.connectedUsers) {
      return res.status(400).json({
        success: false,
        message: "No conversation found",
      });
    }

    const conversation = await Conversation
      .findById(sender.connectedUsers)
      .populate("allMessages");

    if (!conversation) {
      return res.status(400).json({
        success: false,
        message: "No conversation found",
      });
    }

    const messages = conversation.allMessages.filter(msg =>
      (msg.senderId.equals(senderId) && msg.receiverId.equals(receiverId)) ||
      (msg.senderId.equals(receiverId) && msg.receiverId.equals(senderId))
    );

    return res.status(200).json({
      success: true,
      messages,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const userId = req.id;
    const deleteUserId = req.params.id;

    const user = await User.findById(userId);
    const conversationId = user.connectedUsers;

    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: deleteUserId },
        { senderId: deleteUserId, receiverId: userId }
      ]
    }).select("_id");

    const messageIds = messages.map(m => m._id);

    await Conversation.findByIdAndUpdate(conversationId, {
      $pull: {
        participants: deleteUserId,
        allMessages: { $in: messageIds }
      }
    });

    return res.status(200).json({
      success: true,
      message: "Deleted user",
      deleteUserId,
    });

  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Failed to delete",
    });
  }
};
