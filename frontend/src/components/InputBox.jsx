import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { baseurl } from "../../address/address";
import { setMsg } from "../../redux/chatSlice";
import { Send } from "lucide-react";
import { socket } from "../App";

function InputBox({ theirId }) {
  const [msg, currMsg] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) return;
    socket.on("Msg from sender", (newMessage) => {
      dispatch(setMsg(newMessage));
    });

    return () => socket.off("Msg from sender");
  }, [dispatch]);

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMsg();
    }
  }

 async function sendMsg() {
  if (msg.trim() === "") return;

  const messageToSend = msg;
  currMsg("");

  try {
    const res = await axios.post(
      `${baseurl}/sendmsg/${theirId}`,
      { message: messageToSend },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    if (res.data.success) {
      dispatch(setMsg(res.data.newMessage));
    }
  } catch (err) {
    console.log(err);
  }
}


  return (
    <div className="sticky bottom-0 w-full px-4 py-3 bg-gradient-to-t from-black/80 via-black/60 to-transparent backdrop-blur-xl">
      <div className="flex items-center gap-3 max-w-5xl mx-auto">
        <input
          type="text"
          placeholder="Type a message…"
          value={msg}
          onChange={(e) => currMsg(e.target.value)}
          onKeyDown={handleKeyDown}
          className="
            flex-1 px-5 py-3 rounded-full
            bg-white/15 backdrop-blur-md
            border border-white/20
            text-white text-[15px]
            font-[Inter]
            placeholder:text-gray-300
            focus:outline-none focus:ring-2 focus:ring-blue-500
            transition
          "
        />

        <button
          onClick={sendMsg}
          className="
            group flex items-center justify-center
            h-12 w-12 rounded-full
            bg-blue-600 hover:bg-blue-500
            active:scale-95
            shadow-lg shadow-blue-600/40
            transition-all
          "
        >
          <Send className="text-white w-5 h-5 group-hover:translate-x-[1px] transition-transform" />
        </button>
      </div>
    </div>
  );
}

export default InputBox;
