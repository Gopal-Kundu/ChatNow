import React, { useEffect, useRef } from "react";

function Message({ user, text }) {
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [text]);

  return (
    <div
      ref={scrollRef}
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
