import React from "react";

function Message({ user, text }) {
  return (
    <div
      className={`flex max-w-screen my-1 ${
        user === "true" ? "mr-10 justify-end" : "ml-10 justify-start"
      }`}
    >
      <div
        className={`comic text-xl text-white rounded-2xl tracking-wider max-w-[60%] p-4 ${
          user === "true" ? "bg-green-700" : "bg-purple-500"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

export default Message;
