import React from "react";
import { MessageSquare } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
   
      <div className="absolute w-72 h-72 bg-blue-600/20 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>

      <div className="relative flex flex-col items-center z-10">
        
        
        <div className="relative w-24 h-24 flex items-center justify-center">
       
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-b-purple-500 animate-spin"></div>
        
          <div className="absolute inset-2 rounded-full border-4 border-transparent border-l-blue-400/50 border-r-purple-400/50 animate-[spin_3s_linear_reverse]"></div>
          
          <MessageSquare className="w-8 h-8 text-white relative z-10 animate-pulse" strokeWidth={1.5} />
        </div>

        <div className="mt-8 flex items-center gap-1">
          <span className="text-lg font-medium tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 uppercase ml-3">
            Loading
          </span>
          
          <div className="flex gap-1 pt-1 ml-1">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoadingPage;