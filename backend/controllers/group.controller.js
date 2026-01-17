import { uploadToCloudinary } from "../configs/fileToCloudinary.js";
import { Group } from "../models/group.model.js";
import { User } from "../models/user.model.js";

export const createGroup = async (req, res) => {
  try {
    const { groupName, members } = req.body;
    let {logo} = req.file;
    const adminId = req.id;

    if (!groupName) {
      return res.status(400).json({
        success: false,
        message: "Group name is required",
      });
    }
    if(logo){
       logo = await uploadToCloudinary(logo);
    }
    const newGroup = await Group.create({
      groupName,
      logo,
      members: [members],
      admins: [adminId],
    });

    await User.findByIdAndUpdate(adminId, {
        $$addToSet: {
            joinedGroups: newGroup._id,
        }
    });

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
