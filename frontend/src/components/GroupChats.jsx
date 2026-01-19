import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import defaultGroupImg from "../assets/defaultUser.png";
import { Trash2, Users } from "lucide-react";
import axios from "axios";
import { baseurl } from "../../address/address";

function GroupChats({ id, groupName, logo }) {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  function openGroupChat() {
    navigate(`group-chat/${id}`);
  }

  async function deleteGroup() {
    try {
      const res = await axios.delete(`${baseurl}/group/${id}`, {
        withCredentials: true,
      });
      setShowPopup(false);
    } catch (err) {
      console.error("Delete group failed");
    }
  }

  return (
    <div className="select-none cursor-pointer">
      <div
        className="flex items-center gap-3 px-4 py-3 w-full
                   bg-white/10 hover:bg-white/20
                   transition-colors duration-200
                   border-b border-white/10"
      >
        <div className="shrink-0">
          <Link to={`group-profile/${id}`}>
            <div className="h-11 w-11 rounded-full overflow-hidden border border-white/20">
              <img
                src={logo || defaultGroupImg}
                alt="Group"
                className="h-full w-full object-cover"
              />
            </div>
          </Link>
        </div>

        <div onClick={openGroupChat} className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Users size={20} className="text-blue-400" />
            <p className="text-white font-semibold text-xl truncate">
              {groupName}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowPopup(true)}
          className="p-2 rounded-full text-gray-400
                     hover:text-red-500 hover:bg-red-500/10
                     transition-all"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-gray-900 rounded-2xl p-6 w-80 border border-white/10">
            <h3 className="text-white text-lg font-semibold mb-2">
              Delete Group?
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              This will permanently delete the group and its chats.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition"
              >
                Cancel
              </button>

              <button
                onClick={deleteGroup}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GroupChats;
