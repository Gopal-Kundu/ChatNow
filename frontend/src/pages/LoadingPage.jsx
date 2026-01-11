import React from "react";

const LoadingPage = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black">
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative h-24 w-24">
          <div className="absolute inset-0 rounded-full border-4 border-blue-500/30 animate-ping"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-purple-500 border-b-cyan-400 border-l-transparent animate-spin"></div>
        </div>

        <h1 className="text-2xl font-semibold text-white tracking-wide">
          ChatNow
        </h1>

        <p className="text-gray-400 text-sm">
          Loading Please Wait...
        </p>

        <div className="flex gap-1 mt-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
