import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  username: { type: String, required: true, default: "" },
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePhoto: { type: String, default: "" },
  about: { type: String, default: "" },
  connectedUsers: {type: mongoose.Schema.Types.ObjectId, ref: "Conversation"},
  joinedGroups: [{
    groups: {type: mongoose.Schema.Types.ObjectId, ref: "Group"},
    newMsgCount: {type: Number, default: 0}
  }]
})
export const User = mongoose.model("User", userModel);
