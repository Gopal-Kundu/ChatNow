//Making this conversation model beacuse of fast message retrival from message schema.
import mongoose from "mongoose";

const conversationModel = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  message: [{type: mongoose.Schema.Types.ObjectId, ref: "Message"}]
});

export const Conversation = mongoose.model("Conversation", conversationModel);
