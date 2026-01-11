import React from "react";
import bg from "../assets/chatBackground.jpg";
import NavBarforChatPage from "./NavBarforChatPage";
import ChatSection from "./ChatSection";
import InputBox from "./InputBox";
import { useParams } from "react-router-dom";
export function RightSideBar() {
  const { id } = useParams();
  return (
    <div
      className="h-screen flex flex-col fade-in-bottom"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
        <NavBarforChatPage />
        <ChatSection theirId={id} />
        <InputBox theirId={id} />
    </div>
  );
}
