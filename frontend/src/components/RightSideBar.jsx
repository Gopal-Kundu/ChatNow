import React from "react";
import bg from "../assets/chatBackground.jpg";
import NavBarforChatPage from "./NavBarforChatPage";
import ChatSection from "./ChatSection";
import InputBox from "./InputBox";
import { useParams } from "react-router-dom";
function RightSidebar() {
  const {id} = useParams();
  return (
    <div className="min-h-screen max-w-screen relative fade-in-bottom" style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div>
        <NavBarforChatPage />
        <ChatSection theirId={id}/>
        <div className="flex items-center justify-center">
          {console.log("At sidebar", id)}
          <InputBox theirId={id}/>
        </div>
      </div>
    </div>
  );
}

export default RightSidebar;
