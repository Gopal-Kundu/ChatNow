import React, { useEffect, useState } from "react";
import { LogOut, CirclePlus } from "lucide-react";
import Chats from "./Chats";
import { useDispatch, useSelector } from "react-redux";
import defaultImg from "../assets/defaultUser.png";
import { Link, useNavigate } from "react-router-dom";
import { Users } from "lucide-react";
import axios from "axios";
import CreateGroup from "../pages/CreateGroup";

import {
  setAllMsgs,
  setChats,
  setMsg,
  setNewChat,
} from "../../redux/chatSlice";
import { setUser } from "../../redux/authSlice";
import { baseurl } from "../../address/address";
import { toast } from "sonner";
import Footer from "./Footer";
import GroupChats from "./GroupChats";

function LeftSideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const chat = useSelector((state) => state.chat.chats) || [];
  const user = useSelector((state) => state.auth.user);
  const group = useSelector((state) => state.chat.groups) || [];
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showCreateGroup, setShowCreateGroup] = useState(false);


  const logo = user?.profilePhoto || defaultImg;

  async function handleLogout() {
    try {
      const res = await axios.get(`${baseurl}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setChats([]));
        dispatch(setAllMsgs([]));
        dispatch(setMsg(null));
        dispatch(setUser(null));
        navigate("/login");
      }
    } catch (err) {
      toast.error("Logout failed");
    }
  }

  async function addUserToChat() {
    if (!phoneNumber.trim()) {
      toast.error("Enter phone number");
      return;
    }

    try {
      const res = await axios.post(
        `${baseurl}/adduser`,
        { phoneNumber },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.data.success) {
        dispatch(setNewChat(res.data.newUser));
        setPhoneNumber("");
        toast.success("New user added", {
          position: "top-center",
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add user", {
        position: "top-center",
        duration: 2000,
      });
    }
  }

  function handleCreateGroup() {
    setShowCreateGroup(true);
  }



  return (
    
<div className="flex flex-col h-[100dvh] border-r border-white/20 bg-transparent">

      <div className="flex items-center gap-3 p-4 border-b border-white/20">
        <Link to={`profile/${user._id}`}>
          <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white cursor-pointer hover:scale-105 transition">
            <img src={logo} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </Link>

        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Add user by number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <CirclePlus
          onClick={addUserToChat}
          className="text-white w-6 h-6 cursor-pointer hover:text-blue-400"
        />

        <Users
          onClick={handleCreateGroup}
          className="text-white w-6 h-6 cursor-pointer hover:text-green-400"
        />

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/20 hover:bg-red-500/80 text-white transition"
        >
          <LogOut size={18} />
          <span className="hidden md:block">Logout</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {chat.map((chat) => (
          <Chats
            key={chat.user?._id}
            id={chat.user?._id}
            name={chat.user?.username}
            logo={chat.user?.profilePhoto}
            newMsgCount={chat?.newMsgCount}
          />
        ))}

        {group?.map((perGroup, idx) => (
          <GroupChats
            key={idx}
            id={perGroup?._id}
            groupName={perGroup?.groupName}
            logo={perGroup?.logo}
            newMsgCount = {perGroup?.count}
          />
        ))}
      </div>

      <div className="border-t border-white/20">
        <Footer />
      </div>

      {showCreateGroup && (
        <CreateGroup onClose={() => setShowCreateGroup(false)} />
      )}

    </div>

       
  );
}

export default LeftSideBar;
