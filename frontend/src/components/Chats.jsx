import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import defaultImg from "../assets/defaultUser.png";
import { useDispatch, useSelector } from "react-redux";
import { Trash2 } from "lucide-react";
import { deleteUser } from "../../redux/chatSlice";
import axios from "axios";
import { baseurl } from "../../address/address";
function Chats({ id, name, logo }) {
  
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  function openChat() {
    navigate(`chat/${id}`);
  }
  const online = useSelector((store) => store.socket.onlineUsers);

  async function deleteChat() {
    try {
      const res = await axios.get(`${baseurl}/deleteChat/${id}`, {
        withCredentials: true,
      });
      setShowPopup(false);
      if(res.data.success){
        dispatch(deleteUser(res.data.deleteUserId));
      }
    } catch (err) {
      console.error("Delete failed");
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
        <div className="relative shrink-0">
          <Link to={`profile/${id}`}>
            <div className="h-11 w-11 rounded-full overflow-hidden border border-white/20">
              <img
                src={logo || defaultImg}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
          </Link>
          <span
            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-black
        ${online?.includes(id) ? "bg-green-500" : "bg-gray-500"}`}
          />
        </div>
        <div onClick={openChat} className="flex-1 min-w-0">
          <p className="text-white font-semibold text-2xl truncate">{name}</p>
        </div>
        <button
          onClick={(e) => {
            setShowPopup(true);
          }}
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
              Delete Chat?
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              This will permanently delete this conversation.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition"
              >
                Cancel
              </button>

              <button
                onClick={deleteChat}
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

export default Chats;
