import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePhoto: { type: String },
  about: { type: String },
});

export const User = mongoose.model("User", userModel);
