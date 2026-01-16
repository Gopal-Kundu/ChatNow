import React, { useEffect, useState } from "react";
import bg from "../assets/chatBackground.jpg";
import NavBarforChatPage from "./NavBarforChatPage";
import ChatSection from "./ChatSection";
import InputBox from "./InputBox";
import { useParams } from "react-router-dom";

export function RightSideBar() {
  const { id } = useParams();

  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const updateHeight = () => {
      if (window.visualViewport) {
        setViewportHeight(window.visualViewport.height);
      }
    };

    window.visualViewport?.addEventListener("resize", updateHeight);
    window.addEventListener("resize", updateHeight);

    return () => {
      window.visualViewport?.removeEventListener("resize", updateHeight);
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <div
      className="flex flex-col fade-in-bottom"
      style={{
        height: `${viewportHeight}px`, 
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
