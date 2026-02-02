import React, { useEffect, useState } from "react";
import bg from "../assets/chatBackground.jpg";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBarforGroupPage from "../components/NavBarforGroupPage";
import GroupChatSection from "../components/GroupChatSection";
import GroupInputBox from "../components/GroupInputBox";
import { socket } from "../App";
import { baseurl } from "../../address/address";
import axios from "axios";
import { setGroupMsgToZero } from "../../redux/chatSlice";

export function GroupChatPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const userId = useSelector((state) => state.auth.user)?._id;

  useEffect(() => {
    if (!id || !socket || !userId) return;

    socket.emit("ACTIVE_GROUP_CHAT", {
      userId,
      groupId: id,
    });

    return () => {
      socket.emit("LEAVE_GROUP_CHAT", { userId });
    };
  }, [id, userId]);

  useEffect(() => {
    if (!id) return;

    const setZero = async () => {
      try {
        const res = await axios.get(
          `${baseurl}/set-group-msg-to-zero/${id}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setGroupMsgToZero({ groupId: id }));
        }
      } catch (error) {
        console.error("Something Wrong !!", error);
      }
    };

    setZero();
  }, [id, dispatch]);

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
      className="select-none flex flex-col"
      style={{
        height: `${viewportHeight}px`,
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
      }}
    >
      <NavBarforGroupPage />
      <GroupChatSection />
      <GroupInputBox />
    </div>
  );
}
