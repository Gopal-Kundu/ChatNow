import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
    {
        groupName: {
            type: String,
            required: true,
            default: "New Group",
            trim: true,
        },

        logo: {
            type: String,
            default: "https://shorturl.at/nuCHP",
        },

        members: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
            default: [],
        },

        messages: {
            type: [
                {
                    senderId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User",
                        default: null,
                    },
                    message: {
                        type: String,
                        default: "",
                        trim: true,
                    },
                    time: {
                        type: Date,
                        default: Date.now,
                    },
                },
            ],
            default: [],
        },

        admins: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

export const Group = mongoose.model("Group", groupSchema);
