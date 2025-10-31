import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RightSidebar from "./components/RightSidebar";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { baseurl } from "../address/address";
import { setOnlineUsers } from "../redux/socketSlice";
import UpdateProfilePage from "./pages/UpdateProfilePage";

export let socket;
const App = () => {
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();
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
        <Route path="/:id" element={<RightSidebar />} />
        <Route path="/update" element={<UpdateProfilePage />} />
      </Routes>
    </div>
  );
};

export default App;
