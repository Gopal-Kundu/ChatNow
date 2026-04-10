import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseurl } from "../../address/address";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Users, CheckCircle, Camera, X } from "lucide-react"; // Added Camera and X icons
import defaultImg from "../assets/defaultUser.png";
import { setNewChat, setNewGroup } from "../../redux/chatSlice";

function CreateGroup({ onClose }) {
  const dispatch = useDispatch();
  const allContacts = useSelector((state) => state.chat.chats);
  const admin = useSelector((state) => state.auth.user)?._id;
  
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([admin]);
  const [loading, setLoading] = useState(false);

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  function toggleUser(userId) {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  }

  function handleLogoChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  }

  useEffect(() => {
    return () => {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
    };
  }, [logoPreview]);

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

      const formData = new FormData();
      formData.append("groupName", groupName);
      selectedUsers.forEach((id) => formData.append("members", id));

      if (logoFile) formData.append("logo", logoFile);

      const res = await axios.post(
        `${baseurl}/group/create`,
        formData,
        { withCredentials: true }
      );

      if (res?.data?.success) {
        dispatch(setNewGroup(res.data.group));
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
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div className="w-full max-w-md bg-white/10 border border-white/20 rounded-3xl p-7 backdrop-blur-xl shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-xl">
              <Users className="text-blue-400 w-6 h-6" />
            </div>
            <h2 className="text-2xl font-semibold text-white">
              New Group
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Improved Image Upload Section */}
        <div className="flex flex-col items-center justify-center mb-6">
          <label 
            htmlFor="groupLogoInput" 
            className="relative cursor-pointer group flex flex-col items-center"
          >
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-dashed border-white/30 group-hover:border-blue-400 transition-all duration-300 shadow-lg group-hover:shadow-blue-500/20">
              <img
                src={logoPreview || defaultImg}
                alt="Group Logo"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Camera className="w-8 h-8 text-white mb-1" />
                <span className="text-xs text-white font-medium tracking-wide">Upload</span>
              </div>
            </div>
            {!logoPreview && (
              <span className="text-gray-400 text-sm mt-3 group-hover:text-blue-300 transition-colors">
                Set group photo
              </span>
            )}
          </label>
          <input
            id="groupLogoInput"
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="hidden"
          />
        </div>

        {/* Group Name Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full px-5 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* Contacts List */}
        <div className="max-h-60 overflow-y-auto space-y-2 mb-6 pr-2 custom-scrollbar">
          {allContacts?.length ? (
            allContacts
              .filter((c) => c?.user?._id)
              .map((chat) => {
                const user = chat.user;
                const isSelected = selectedUsers.includes(user._id);

                return (
                  <div
                    key={user._id}
                    onClick={() => toggleUser(user._id)}
                    className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? "bg-blue-500/20 border border-blue-500/50"
                        : "bg-white/5 hover:bg-white/10 border border-transparent"
                    }`}
                  >
                    <img
                      src={user.profilePhoto || defaultImg}
                      alt={user.username}
                      className="w-12 h-12 rounded-full object-cover border border-white/10"
                    />

                    <span className="flex-1 text-white font-medium">
                      {user.username}
                    </span>

                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected ? "border-blue-500 bg-blue-500" : "border-gray-500"
                    }`}>
                      {isSelected && <CheckCircle className="text-white w-4 h-4" />}
                    </div>
                  </div>
                );
              })
          ) : (
            <div className="text-center py-8 text-gray-400">
              No Users Found
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={handleCreateGroup}
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold tracking-wide transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Creating...
            </span>
          ) : (
            "Create Group"
          )}
        </button>
      </div>
    </div>
  );
}

export default CreateGroup;