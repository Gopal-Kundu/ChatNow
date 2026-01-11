import React from "react";
import { Link, useNavigate } from "react-router-dom";
import defaultImg from "../assets/defaultUser.png";
import { useSelector } from "react-redux";
function Chats({ id, name, logo}) {
  const navigate = useNavigate();

  function openChat() {
    navigate(`chat/${id}`);
  }
  const online = useSelector((store)=>store.socket.onlineUsers);
  return (
    <div
  className="select-none cursor-pointer"
>
  <div className="flex items-center gap-3 px-4 py-3 w-full
                  bg-white/10 hover:bg-white/20
                  transition-colors duration-200
                  border-b border-white/10">
    <div className="relative shrink-0">
      <Link to={`profile/${id}`}>
      <div className="h-11 w-11 rounded-full overflow-hidden border border-white/20">
        <img
          src={logo || defaultImg}
          alt="Profile"
          className="h-full w-full object-cover"
        />
      </div>
      </Link>
      <span
        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-black
        ${online?.includes(id) ? "bg-green-500" : "bg-gray-500"}`}
      />
    </div>
    <div onClick={openChat} className="flex-1 min-w-0">
      <p className="text-white font-semibold text-2xl truncate">
        {name}
      </p>
    </div>
  </div>
</div>

  );
}

export default Chats;
