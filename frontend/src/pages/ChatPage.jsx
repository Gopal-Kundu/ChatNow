import React, { useEffect } from "react";
import LeftSideBar from "../components/LeftSideBar";
import { setLoading } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { baseurl } from "../../address/address";
import axios from "axios";
import { setChats } from "../../redux/chatSlice";
import LoadingPage from "./LoadingPage";

function ChatPage() {
  const loading = useSelector((state)=>state.auth.loading);
  const chat = useSelector((state)=>state.chat.chats);
  
  return (
    <div className='h-screen bg-[url("https://png.pngtree.com/background/20250104/original/pngtree-free-hd-wallpaper-4k-new-background-picture-image_15546678.jpg")] bg-cover bg-center '>
      <div className=" bg-black/50 bg-screen">
        {loading ? <LoadingPage/> : <LeftSideBar />}
      </div>
    </div>
  );
}

export default ChatPage;
