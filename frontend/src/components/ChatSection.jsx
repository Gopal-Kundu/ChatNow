import React, { useEffect, useRef } from "react";
import LoadingPage from "../pages/LoadingPage";
import Message from "../components/Message";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ChatSection({ theirId }) {
  const loading = useSelector((state) => state.auth?.loading);
  const user = useSelector((state) => state.auth?.user);
  const allMsgs = useSelector((state) => state.chat?.msgContainer || []);
  const { id } = useParams();

  const bottomRef = useRef(null);

  const filteredMsgs = allMsgs.filter(
    (msg) =>
      (msg.receiverId === id && msg.senderId === user._id) ||
      (msg.senderId === id && msg.receiverId === user._id)
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [filteredMsgs.length]);

  return (
    <div className="webkit-scrollbar flex-1 overflow-y-auto">
      {loading ? (
        <LoadingPage />
      ) : (
        <div>
          {filteredMsgs.map((msg, idx) => (
            <Message
              key={idx}
              user={theirId === msg?.senderId ? "false" : "true"}
              text={msg?.message}
            />
          ))}

          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
}

export default ChatSection;
