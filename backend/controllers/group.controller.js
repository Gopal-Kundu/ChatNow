import mongoose from "mongoose";
import { uploadToCloudinary } from "../configs/fileToCloudinary.js";
import { Group } from "../models/group.model.js";
import { User } from "../models/user.model.js";

export const createGroup = async (req, res) => {
  try {
    let { groupName, members } = req.body;
    let logo;
    const adminId = req.id;

    if (!groupName) {
      return res.status(400).json({
        success: false,
        message: "Group name is required",
      });
    }

    if (!members) {
      return res.status(400).json({
        success: false,
        message: "Members are required",
      });
    }

    if (typeof members === "string") {
      members = [members];
    }

    members = members.map(id => new mongoose.Types.ObjectId(id));

    if (req.file) {
      logo = await uploadToCloudinary(req.file);
    }

    const newGroup = await Group.create({
      groupName,
      logo,
      members,
      admins: [adminId],
    });

    await User.findByIdAndUpdate(adminId, {
      $addToSet: { joinedGroups: newGroup._id },
    });

    await User.updateMany(
      { _id: { $in: members } },
      {
        $addToSet: { joinedGroups: newGroup._id },
      }
    );

    return res.status(201).json({
      success: true,
      message: "Group created successfully",
      group: newGroup,
    });
  } catch (error) {
    console.error("Create Group Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const sendGroupMessage = async (req, res) => {
  try {
    const id = req.id;
    const { message } = req.body;
    const groupId = req.params.groupId;
    if (!id || !message || !groupId) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      })
    }
    const group = await Group.findById(groupId);
    group.messages.push({
      senderId: id,
      message: message,
    })
    group.save();
    await group.populate({
      path: "messages.senderId",
      select: "-password",
    })

    const resMsg = group.messages[group.messages.length-1]; 
    return res.status(200).json({
      success: true,
      resMsg
    })

  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Server error",
    })
  }
}
