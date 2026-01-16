import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import defaultImg from "../assets/defaultUser.png"
import { baseurl } from "../../address/address";

function NavBarforChatPage() {
  const navigate = useNavigate();
  const online = useSelector((store)=>store.socket.onlineUsers);
  const {id} = useParams();
  const chat = useSelector((state)=>state.chat?.chats);
  const logo = chat?.find((arr)=>arr._id===id)?.profilePhoto;
  function navigateToChatScreen() {
    navigate("/");
  }

  return (
    <div className="sticky z-[10] top-0">
      <div className="p-2 flex items-center flex-row h-[8vh] md:h-[12vh] bg-indigo-400">
        <ArrowLeft
          className="text-white size-8"
          onClick={navigateToChatScreen}
        />

        <div className="relative">
          <Link to={`/profile/${id}`}><div className=" border-black h-11 w-11 rounded-full overflow-hidden border-2 cursor-pointer ml-2">
            <img src={logo ? logo : defaultImg} alt="Profile-photo" className="h-full w-full object-cover"/>
          </div></Link>
          <div
            className={`${online?.includes(id) ? "bg-green-700" : ""} h-3 w-3 absolute rounded-full top-8 left-8 z-1`}
          ></div>
        </div>

        <div className="flex-1">
          <div className="overflow-hidden cursor-pointer h-7  ml-4 text-white text-md font-bold inter text-xl">
            {chat?.find((arr)=>arr._id===id)?.username || "User"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBarforChatPage;
