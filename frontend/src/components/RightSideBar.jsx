import React, { useEffect, useState } from "react";
import bg from "../assets/chatBackground.jpg";
import NavBarforChatPage from "./NavBarforChatPage";
import ChatSection from "./ChatSection";
import InputBox from "./InputBox";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseurl } from "../../address/address";
import { useDispatch } from "react-redux";
import { setNewMsgCountToZero } from "../../redux/chatSlice";
import { socket } from "../App";

export function RightSideBar() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    if (!id || !socket) return;

    socket.emit("ACTIVE_CHAT", id);

    return () => {
      socket.emit("ACTIVE_CHAT", null);
    };
  }, [id]);

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

  useEffect(() => {
    if (!id) return;

    const resetMsgCount = async () => {
      try {
        await axios.get(`${baseurl}/setmsgcount/${id}`, {
          withCredentials: true,
        });

        dispatch(setNewMsgCountToZero({ _id: id }));
      } catch (err) {
        console.error(err);
      }
    };

    resetMsgCount();
  }, [id, dispatch]);

  return (
    <div
      className="flex flex-col select-none"
      style={{
        height: `${viewportHeight}px`,
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
      }}
    >
      <NavBarforChatPage />
      <ChatSection theirId={id} />
      <InputBox theirId={id} />
    </div>
  );
}
