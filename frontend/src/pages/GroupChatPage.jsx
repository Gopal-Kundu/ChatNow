import React, { useEffect, useState } from "react";
import bg from "../assets/chatBackground.jpg";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import NavBarforGroupPage from "../components/NavBarforGroupPage";
import GroupChatSection from "../components/GroupChatSection";

export function GroupChatPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
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
      className="flex flex-col"
      style={{
        height: `${viewportHeight}px`,
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
      }}
    >
      <NavBarforGroupPage />
      <GroupChatSection/>
    </div>
  );
}
