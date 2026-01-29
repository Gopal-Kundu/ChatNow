import React from "react";
import defaultImg from "../assets/defaultUser.png";

function GroupMessage({
  user,
  text,
  createdAt,
  senderName,
  senderLogo,
}) {
  const time = new Date(createdAt).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  const isMe = user === "true";

  return (
    <div
      className={`select-none flex my-1 ${
        isMe ? "mr-10 justify-end" : "ml-10 justify-start"
      }`}
    >
      <div
        className={`flex gap-2 max-w-[70%] ${
          isMe ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <img
          src={senderLogo || defaultImg}
          alt={senderName}
          className="w-9 h-9 rounded-full object-cover"
        />

        <div
          className={`comic text-white rounded-2xl tracking-wider p-4 ${
            isMe ? "bg-green-700" : "bg-purple-500"
          }`}
        >
          <p className="text-sm font-semibold mb-1 opacity-90">
            {senderName}
          </p>

          <p className="text-lg">{text}</p>

          <p className="text-xs text-gray-200 mt-1 text-right">
            {time}
          </p>
        </div>
      </div>
    </div>
  );
}

export default GroupMessage;
