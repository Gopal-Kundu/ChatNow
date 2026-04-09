import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import logo from "../assets/defaultUser.png";
import ProfileForm from "../components/ProfileForm";
import { useParams, useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { User, Info, Edit3, ArrowLeft } from "lucide-react";

function UpdateProfilePage() {
  const currentUser = useSelector((state) => state.auth.user);
  const chats = useSelector((state) => state.chat.chats) || [];
  const onlineUsers = useSelector((state) => state.socket.onlineUsers) || [];
  const loading = useSelector((state) => state.auth.loading);

  const [showEdit, setShowEdit] = useState(false);
  const [chatUser, setChatUser] = useState(null);
  const [open, setOpen] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id || !currentUser) return;

    if (id === currentUser._id) {
      setChatUser(currentUser);
      setShowEdit(true);
      return;
    }

    const chat = chats.find((c) => c.user._id === id);

    if (chat) {
      setChatUser(chat.user);
      setShowEdit(false);
    } else {
      setChatUser(null);
      setShowEdit(false);
    }
  }, [id, chats, currentUser]);

const isOnline = chatUser && (
    chatUser._id === currentUser?._id || 
    onlineUsers.includes(chatUser._id)
  );

  if (loading) return <LoadingPage />;

  if (!chatUser) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-8 left-8 p-3 bg-neutral-900 hover:bg-neutral-800 rounded-full text-white transition-all duration-200"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="text-neutral-400 font-medium tracking-widest uppercase">
          User not found
        </div>
      </div>
    );
  }

  return (
    <div className="select-none min-h-screen w-full bg-black flex justify-center items-center p-4 sm:p-8 relative">
      {open && <ProfileForm open={open} setOpen={setOpen} />}

      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 md:top-8 md:left-8 p-3 bg-neutral-900/80 hover:bg-neutral-800 rounded-full text-white backdrop-blur-md transition-all duration-200 shadow-lg z-50"
      >
        <ArrowLeft className="w-6 h-6 md:w-5 md:h-5" />
      </button>

      <div className="w-full max-w-md bg-[#111111] rounded-[2rem] border border-neutral-800 shadow-2xl overflow-hidden relative">
        
        <div className="h-36 bg-gradient-to-tr from-blue-600 via-purple-600 to-blue-400 opacity-90"></div>

        <div className="px-8 pb-8 flex flex-col items-center relative">
          <div className="relative -mt-16 mb-4">
            <img
              src={chatUser.profilePhoto || logo}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-[6px] border-[#111111] bg-neutral-900 shadow-xl"
            />
            {isOnline && (
              <div className="absolute bottom-1 right-2 w-5 h-5 bg-green-500 border-[3px] border-[#111111] rounded-full shadow-sm" />
            )}
          </div>

          <h2 className="text-2xl font-bold text-white tracking-tight">
            {chatUser.username || "Anonymous"}
          </h2>
          
          {isOnline ? (
            <span className="text-green-500 text-sm font-medium mt-1">Online now</span>
          ) : (
            <span className="text-neutral-500 text-sm font-medium mt-1">Offline</span>
          )}

          <div className="w-full mt-8 space-y-4">
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4 flex gap-4 items-start">
              <User className="text-blue-500 w-5 h-5 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-neutral-500 font-bold tracking-wider mb-1">USERNAME</p>
                <p className="text-white font-medium">{chatUser.username || "Anonymous"}</p>
              </div>
            </div>

            <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4 flex gap-4 items-start">
              <Info className="text-purple-500 w-5 h-5 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-neutral-500 font-bold tracking-wider mb-1">ABOUT</p>
                <p className="text-white font-medium leading-relaxed">
                  {chatUser.about || "Hey there! I am using ChatNow."}
                </p>
              </div>
            </div>
          </div>

          {showEdit && (
            <button
              onClick={() => setOpen(true)}
              className="mt-8 w-full bg-white text-black hover:bg-neutral-200 transition-all duration-200 py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpdateProfilePage;