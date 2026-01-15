import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseurl } from "../../address/address";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Users, CheckCircle } from "lucide-react";
import defaultImg from "../assets/defaultUser.png";
import { setNewChat } from "../../redux/chatSlice";

function CreateGroup({ onClose }) {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.user);
  const allContacts = useSelector((state) => state.chat.chats);

  const [groupName, setGroupName] = useState("");
  const [users, setUsers] = useState(allContacts || []);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  function toggleUser(userId) {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  }

  async function handleCreateGroup() {
    if (!groupName.trim()) {
      toast.error("Group name is required");
      return;
    }

    if (selectedUsers.length < 1) {
      toast.error("Select at least one member");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${baseurl}/group/create`,
        {
          groupName,
          members: selectedUsers,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res?.data?.success) {
        dispatch(setNewChat(res.data.group));
        toast.success("Group created successfully");
        onClose(); 
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Group creation failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md bg-transparent border border-white/20 rounded-2xl p-6 backdrop-blur-xl">
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Users className="text-white" />
            <h2 className="text-xl font-semibold text-white">
              Create New Group
            </h2>
          </div>

          <button
            onClick={onClose}
            className="cursor-pointer text-white hover:text-red-400 text-lg"
          >
            ✕
          </button>
        </div>

        <input
          type="text"
          placeholder="Group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="max-h-64 overflow-y-auto space-y-2 mb-4">
          {users ? users?.map((user) => {
            const isSelected = selectedUsers.includes(user._id);

            return (
              <div
                key={user._id}
                onClick={() => toggleUser(user._id)}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition
                  ${
                    isSelected
                      ? "bg-blue-500/30 border border-blue-400"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
              >
                <img
                  src={user.profilePhoto || defaultImg}
                  alt={user.username}
                  className="w-10 h-10 rounded-full object-cover"
                />

                <span className="flex-1 text-white">
                  {user.username}
                </span>

                {isSelected && (
                  <CheckCircle className="text-blue-400 w-5 h-5" />
                )}
              </div>
            );
          }): <h1 align="center" className="text-white ">No Users Found</h1>}
        </div>

        <button
          onClick={handleCreateGroup}
          disabled={loading}
          className="cursor-pointer w-full py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Group"}
        </button>
      </div>
    </div>
  );
}

export default CreateGroup;
