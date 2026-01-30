import mongoose from "mongoose";
import { uploadToCloudinary } from "../configs/fileToCloudinary.js";
import { Group } from "../models/group.model.js";
import { User } from "../models/user.model.js";
import { io, onlineUsers } from "../server.js";

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
    io.emit("create-group", newGroup);
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
    await group.save();
    await group.populate({
      path: "messages.senderId",
      select: "-password",
    })

    const resMsg = group.messages[group.messages.length - 1];
    console.log("My Current Id:", id);
    console.log(group.members);
    let members = group.members.map((eachMember)=> eachMember.toString()) || [];
    console.log(members);

          io.emit("group-msg", {
            groupId,
            message: resMsg,
          });

    return res.status(200).json({
      success: true,
      info: {
        groupId,
        message: resMsg
      }
    })

  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Server error",
    })
  }
}

export const deleteGroupFromUser = async (req, res) => {
  try {
    const userId = req.id; 
    const { groupId } = req.params;

    if (!groupId) {
      return res.status(400).json({
        success: false,
        message: "Group ID is required",
      });
    }
    await User.findByIdAndUpdate(userId, {
      $pull: { joinedGroups: groupId },
    });

    const group = await Group.findByIdAndUpdate(
      groupId,
      {
        $pull: {
          members: userId,
          admins: userId,
        },
      },
      { new: true }
    );

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    if (group.admins.length === 0 && group.members.length > 0) {
      group.admins.push(group.members[0]);
      await group.save();
    }

    return res.status(200).json({
      success: true,
      message: "Group removed from user successfully",
      groupId,
      newAdmin: group.admins[0] || null,
    });

  } catch (error) {
    console.error("Delete Group Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


function getSocketId(userId) {
  return onlineUsers[userId];
}
