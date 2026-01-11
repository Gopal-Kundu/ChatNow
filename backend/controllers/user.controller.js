import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { uploadToCloudinary } from "../configs/fileToCloudinary.js";
import { Conversation } from "../models/conversation.model.js";
dotenv.config({ quiet: true });


export const register = async (req, res) => {
  try {
    const { username, phoneNumber, password } = req.body;
    if (!phoneNumber || !username || !password)
      return res.status(400).json({
        message: "All fields are required to sign up.",
        success: false,
      });
    let isPhoneNumberFound = await User.findOne({ phoneNumber });
    if (isPhoneNumberFound) {
      return res.status(400).json({
        message: "Phone Number already exist",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      phoneNumber,
      password: hashedPassword,
    });
    return res.status(201).json({
      success: true,
      message: "Registered Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};


export const update = async (req, res) => {
  try {
    const id = req.id;
    const update = req.body;
    if (!id) {
      return res.status(400).json({
        message: "Unauthorized user",
        success: false,
      });
    }

    const updatedUser = await User.findByIdAndUpdate(id, update, {
      new: true,
    });
    if (updatedUser)
      return res.status(200).json({
        success: true,
        message: "Profile updated successfully.",
        updatedUser
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something is Wrong",
    });
  }
};


export const uploadProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const user = await User.findById(req.id);
    user.profilePhoto = await uploadToCloudinary(req.file);
    await user.save();
    return res.status(200).json({
      message: "Profile photo uploaded successfully",
      user
    });
  } catch (err) {
    console.error("Upload error:", err.message);

    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


export const login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    if (!phoneNumber || !password) {
      return res.status(400).json({
        message: "Please fill all the boxes",
        success: false,
      });
    }

    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(400).json({
        message: "You must sign in",
        success: false,
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "Wrong password given.",
        success: false,
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    const safeUser = await User.findById(user._id).select(
      "_id username profilePhoto about connectedUsers"
    );

    let allMessages = [];
    let participants = [];

    if (safeUser.connectedUsers) {
      const conversation = await Conversation.findById(
        safeUser.connectedUsers
      )
        .populate("allMessages")
        .populate({
          path: "participants",
          select: "_id username profilePhoto about",
        });

      if (conversation) {
        allMessages = conversation.allMessages || [];
        participants = conversation.participants || [];
      }
    }

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      })
      .json({
        success: true,
        user: safeUser,
        allMessages,
        participants,
      });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};


export const logout = async (req, res) => {
  try {
    const cookie = req.cookies.token;
    if (!cookie) return res.status(400).json({
      message: "No cookie available",
      success: false,
    })
    return res.status(200).clearCookie("token").json({
      message: "logout Successful",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Logout failed.",
    })
  }
};

export const remember = async (req, res) => {
  try {
    const userId = req.id;
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
        success: false,
      });
    }

    const user = await User.findById(userId).select(
      "_id username profilePhoto about connectedUsers"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    let allMessages = [];
    let participants = [];

    if (user.connectedUsers) {
      const conversation = await Conversation.findById(user.connectedUsers)
        .populate("allMessages")
        .populate({
          path: "participants",
          select: "_id username profilePhoto about",
        });

      if (conversation) {
        allMessages = conversation.allMessages || [];
        participants = conversation.participants || [];
      }
    }

    return res.status(200).json({
      success: true,
      user,
      allMessages,
      participants,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "server error",
      success: false,
    });
  }
};


