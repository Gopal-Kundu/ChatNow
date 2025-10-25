import React from "react";
import logo from "../assets/logo.jfif";
function Chats() {
  return (
    <div>
      {/* Chats  */}
      <div className="flex p-2 w-full bg-white/20 h-1/8 border border-b-black">
        {/* Picture */}
        <div className="relative">
          <div className=" border-black h-11 w-11 rounded-full overflow-hidden border-2">
            <img src={logo} alt="Profile-photo" />
          </div>
          <div
            className={`bg-green-700 h-3 w-3 absolute rounded-full top-8 left-8 z-1`}
          ></div>
        </div>
        {/* name and text */}
        <div>
          <div className="overflow-hidden  h-7 w-60 ml-4 text-white text-md font-bold inter">
            Gopal Kundu
          </div>
          <div className="overflow-hidden h-5 w-65 ml-4 text-white text-[12px]">
            This is the last message
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chats;
