//All conversations of specific user
import mongoose from "mongoose";

const conversationModel = new mongoose.Schema({
  participants: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      newMsgCount: { type: Number, default: 0 }
    }
  ],
  allMessages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message", default: [] }]
});

export const Conversation = mongoose.model("Conversation", conversationModel);
