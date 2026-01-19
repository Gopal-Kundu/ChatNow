import React from "react";

function Message({ user, text, createdAt }) {
  const time = new Date(createdAt).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });


  return (
    <div
      className={`flex max-w-screen my-1 ${user === "true" ? "mr-10 justify-end" : "ml-10 justify-start"
        }`}
    >
      <div
        className={`comic text-xl text-white rounded-2xl tracking-wider max-w-[60%] p-4 ${user === "true" ? "bg-green-700" : "bg-purple-500"
          }`}
      >
        <p>{text}</p>

        <p className="text-xs text-gray-200 mt-1 text-right">
          {time}
        </p>
      </div>
    </div>
  );
}

export default Message;
