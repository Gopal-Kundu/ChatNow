//All conversations of specific user
import mongoose from "mongoose";

const conversationModel = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" , default: []}],
  allMessages: [{type: mongoose.Schema.Types.ObjectId, ref: "Message", default: []}]
});

export const Conversation = mongoose.model("Conversation", conversationModel);
