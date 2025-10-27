import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RightSidebar from "./components/RightSidebar";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { baseurl } from "../address/address";

const App = () => {
  const user = useSelector((store) => store.auth.user);

  useEffect(()=>{
    if(!user) return;
    let socket = io(`${baseurl}`);
    socket.emit("Connect me", user._id);
    
    return () => socket.disconnect();
  }, [user]);

  return (
    <div className="bg-black">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/:id" element={<RightSidebar />} />
      </Routes>
    </div>
  );
};

export default App;
