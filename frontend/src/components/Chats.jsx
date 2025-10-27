import React from "react";
import { useNavigate } from "react-router-dom";
import defaultImg from "../assets/defaultUser.png";
import { useSelector } from "react-redux";
function Chats({ id, name, logo}) {
  const navigate = useNavigate();

  function openChat() {
    navigate(`/${id}`);
  }
  const online = useSelector((store)=>store.socket.onlineUsers);
  return (
    <div onClick={openChat} className="select-none">
      {/* Chats  */}
      <div className="flex flex-row p-2 w-full bg-white/20 h-1/8 border border-b-black">
        {/* Picture */}
        <div className="relative">
          <div className=" border-black h-11 w-11 rounded-full overflow-hidden border-2 cursor-pointer">
            <img src={logo ? logo : defaultImg} alt="Profile-photo" />
          </div>
          <div
            className={`${online.includes(id) ? "bg-green-700":""} h-3 w-3 absolute rounded-full top-8 left-8 z-1`}
          ></div>
        </div>
        {/* name and text */}
        <div className="flex-1">
          <div className="overflow-hidden cursor-pointer h-7  ml-4 text-white text-md font-bold inter">
            {name}
          </div>
          <div className="overflow-hidden cursor-pointer h-5  ml-4 text-white text-[12px]">
            This is the last message Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Autem quis, tenetur ab officia unde, beatae tem
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chats;
