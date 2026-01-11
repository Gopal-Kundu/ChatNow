import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  username: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePhoto: { type: String },
  about: { type: String },
  connectedUsers: {type: mongoose.Schema.Types.ObjectId, ref: "Conversation"},
});

export const User = mongoose.model("User", userModel);
