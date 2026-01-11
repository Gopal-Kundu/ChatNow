import React, { useEffect } from "react";
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
import { setChats } from "../redux/chatSlice";
import { RightSideBar } from "./components/RightSideBar";

export let socket;
const App = () => {
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
    useEffect(() => {
    const remember = async () => {
      try {
        const res = await axios.get(`${baseurl}/`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setUser(res.data));
        }

        const res2 = await axios.get(`${baseurl}/getAllChats`,{
          withCredentials: true,
        });
        if (res2.data.success) {
          dispatch(setChats(res2.data.allUsers.participants));
        }
      } catch (err) {
        console.error("No active session");
      }
    };

    remember();
  }, [dispatch]);


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

    return () => socket.disconnect();
  }, [user]);
 
  return (
    <div className="bg-black">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat/:id" element={<RightSideBar />} />
        <Route path="/profile" element={<UpdateProfilePage />} />
        <Route path="/profile/:id" element={<UpdateProfilePage />} />
      </Routes>
    </div>
  );
};

export default App;
