import mongoose from "mongoose";

const group = new mongoose.Schema({
    groupName: {type: String, required: true},
    logo: {type: String, default: "https://shorturl.at/nuCHP"},
    members: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    messages: [{
        senderId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        message: {type: String, default: ""},
        time: {type: Date, default: Date.now}
    }],
    admins: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
});

export const Group = mongoose.model("Group", group);