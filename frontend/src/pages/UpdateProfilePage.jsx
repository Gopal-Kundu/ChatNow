import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import logo from "../assets/defaultUser.png";
import ProfileForm from "../components/ProfileForm";
import { useParams } from "react-router-dom";

function UpdateProfilePage() {
  const currentUser = useSelector((store) => store.auth.user);
  const chats = useSelector((store) => store.chat.chats);
  const onlineUsers = useSelector((store) => store.socket.onlineUsers);

  const [showEdit, setShowEdit] = useState(false);
  const [chatUser, setChatUser] = useState(null);
  const [open, setOpen] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const userFromChats = chats?.find((u) => u._id === id);

    if (userFromChats) {
      setChatUser(userFromChats);
      setShowEdit(false);
    } else {
      setChatUser(currentUser);
      setShowEdit(true);
    }
  }, [id, chats, currentUser]);

  const isOnline = onlineUsers.includes(id);

  return (
    <div className="min-h-screen w-full bg-[#121212] flex justify-center items-start pt-12 font-inter text-white px-4">
      {open && <ProfileForm open={open} setOpen={setOpen} />}

      <div className="w-full max-w-md bg-[#1e1e2f] rounded-2xl shadow-2xl flex flex-col items-center p-8 gap-6">
        
        <div className="relative">
          <img
            src={chatUser?.profilePhoto || logo}
            alt="Profile"
            className="w-36 h-36 md:w-40 md:h-40 rounded-full object-cover border-4 border-blue-500 shadow-lg"
          />

          {isOnline && (
            <div className="absolute bottom-2 right-2 w-4 h-4 md:w-5 md:h-5 bg-green-500 border-2 border-[#1e1e2f] rounded-full"></div>
          )}
        </div>

        <div className="text-center">
          <div className="text-gray-400 text-sm mb-1">NAME</div>
          <div className="text-xl md:text-2xl font-bold break-words">
            {chatUser?.username || "Anonymous"}
          </div>
        </div>

        <div className="w-full bg-[#2a2a3d] rounded-xl p-4 text-center shadow-inner">
          <div className="text-gray-400 text-sm mb-1">STATUS</div>
          <div className="text-white text-base md:text-lg">
            {chatUser?.about || "Hey there! I am using ChatNow."}
          </div>
        </div>

        {showEdit && (
          <button
            onClick={() => setOpen(true)}
            className="mt-2 w-3/5 bg-blue-500 hover:bg-blue-600 transition-all py-3 rounded-xl text-white font-semibold text-base md:text-lg"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}

export default UpdateProfilePage;
