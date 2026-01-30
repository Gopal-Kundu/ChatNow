import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { baseurl } from "../address/address";
import { setOnlineUsers } from "../redux/socketSlice";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import axios from "axios";
import { setUser } from "../redux/authSlice";
import { setAllMsgs, setChats, setGroupAllMsgs, setGroupMsg, setGroups, setMsg, setNewChat, setNewGroup, setNewMsgCount } from "../redux/chatSlice";
import { RightSideBar } from "./components/RightSideBar";
import LoadingPage from "./pages/LoadingPage";
import CreateGroup from "./pages/CreateGroup";
import GroupChats from "./components/GroupChats";
import { GroupChatPage } from "./pages/GroupChatPage";

export let socket;

const App = () => {
  const user = useSelector((store) => store.auth.user);
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
    
  
  useEffect(() => {
      const remember = async () => {
      try {
         setLoading(true);
        const res = await axios.get(`${baseurl}/remember`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setUser(res.data.user));
          dispatch(setAllMsgs(res.data.allMessages));
          dispatch(setChats(res.data.participants));
          dispatch(setGroups(res.data.allGroups));
          dispatch(setGroupAllMsgs(res.data.allGroupMessages));
        }
      } catch (err) {
        console.error("No active session");
      }finally{
       setLoading(false)
      }
    };
    remember();
  }, []);


  useEffect(()=>{
    if(!user) return;
    socket = io(`${baseurl}`);
    socket.emit("Connect me", user._id);
    socket.on("Connected users", (data)=>{
      dispatch(setOnlineUsers(data));
    })

    socket.on("Disconnected users", (data)=>{
      dispatch(setOnlineUsers(data));
    })

    return () => {
    socket.off("Connected users");
    socket.off("Disconnected users");
    socket.disconnect();
  };

  }, [user, dispatch]);

  useEffect(() => {
  if (!socket) return;
  const handleIncomingMessage = (newMessage) => {
    dispatch(setMsg(newMessage));
  };
  const handleIncomingChat = (newChat) => {
    const data = {
      user: newChat
    }
    dispatch(setNewChat(data));
  }
  const handleNewMsgCount = (data) => {
    dispatch(setNewMsgCount(data));
  }
  const handleGroupNewMsg = (data) => {
    dispatch(setGroupMsg(data));
  }
  const handleCreateGroup = (data) => {
    if(data.members.includes(user._id))
    dispatch(setNewGroup(data));
  }
  socket.on("group-msg", handleGroupNewMsg);
  socket.on("New_Msg_Count", handleNewMsgCount);
  socket.on("New_Chat", handleIncomingChat);
  socket.on("Msg_from_sender", handleIncomingMessage);
  socket.on("create-group", handleCreateGroup);
  return () => {
    socket.off("group-msg", handleGroupNewMsg);
    socket.off("New_Msg_Count", handleNewMsgCount);
    socket.off("New_Chat", handleIncomingChat);
    socket.off("Msg_from_sender", handleIncomingMessage);
    socket.off("create-group", handleCreateGroup);
  };
}, [user]);
 
  if(loading) return <LoadingPage/>
  return (
    <div className="bg-black">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat/:id" element={<RightSideBar />} />
        <Route path="group-chat/:id" element={<GroupChatPage/>}/>
        <Route path="/profile" element={<UpdateProfilePage />} />
        <Route path="/profile/:id" element={<UpdateProfilePage />} />
      </Routes>
    </div>
  );
};

export default App;
