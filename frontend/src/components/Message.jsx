import React from "react";
import { Check, CheckCheck, Clock } from "lucide-react";

function Message({ user, text, createdAt, status }) {
  const time = new Date(createdAt).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`select-none flex max-w-screen my-1 ${
        user === "true" ? "mr-10 justify-end" : "ml-10 justify-start"
      }`}
    >
      <div
        className={`comic text-xl text-white rounded-2xl tracking-wider max-w-[60%] p-4 transition-opacity duration-300 ${
          user === "true" ? "bg-green-700" : "bg-purple-500"
        } ${status === "sending" ? "opacity-80" : "opacity-100"}`}
      >
        <p>{text}</p>

        <div className="flex justify-end items-center gap-1 mt-1 text-xs text-gray-200">
          <p>{time}</p>
          {user === "true" && (
            <span
              className={`flex items-center ml-1 ${
                status === "seen" ? "text-blue-300" : "text-gray-300"
              }`}
            >
              {status === "seen" && <CheckCheck size={15} strokeWidth={2.5} />}
              {status === "sent" && <Check size={15} strokeWidth={2.5} />}
              {status === "sending" && <Clock size={13} strokeWidth={2} />}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Message;