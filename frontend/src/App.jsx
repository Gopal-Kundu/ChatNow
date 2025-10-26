import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RightSidebar from "./components/RightSidebar";

const App = () => {
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
