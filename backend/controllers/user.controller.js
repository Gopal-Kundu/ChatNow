import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({quiet : true});
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!email || !username || !password)
      return res.status(400).json({
        message: "All fields are required to sign up.",
        success: false,
      });
    let isEmailFound = await User.findOne({ email });
    if (isEmailFound) {
      return res.status(400).json({
        message: "Email already exist",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      email,
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
    const update  = req.body;
    if (!id) {
      return res.status(400).json({
        message: "Unauthorized user",
        success: false,
      });
    }

    const updatedUser = await User.findByIdAndUpdate( id , update, {
      new: true,
    });
    if (updatedUser)
      return res.status(200).json({
        success: true,
        message: "Profile updated successfully.",
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something is Wrong",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({
        message: "Please fill all the boxes",
        success: false,
      });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        message: "You must sign in",
        success: false,
      });
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched)
      return res.status(400).json({
        message: "Wrong password given.",
        success: false,
      });
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn: "7d"});

    return res.status(200).cookie("token",token, {maxAge: 7*24*60*60*1000, httpOnly: true, sameSite: 'strict'}).json({
      _id: user._id,
      username: user.username,
      photo: user.profilePhoto,
      about: user.about,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Server error",
      success: false,
    });
  }
};

export const logout = async (req, res) =>{
  try{
    const cookie = req.cookies.token;
    if(!cookie) return res.status(400).json({
      message: "No cookie available",
      success: false,
    })
    return res.status(200).clearCookie("token").json({
      message:"logout Successful",
      success: true,
    });
  }catch(error){
    return res.status(400).json({
      success:false,
      message: "Logout failed.",
    })
  }
};
