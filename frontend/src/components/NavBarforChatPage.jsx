import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import defaultImg from "../assets/defaultUser.png";

function NavBarforChatPage() {
  const navigate = useNavigate();
  const online = useSelector((store) => store.socket.onlineUsers);
  const { id } = useParams();
  const chats = useSelector((state) => state.chat.chats) || [];

  const chatUser = chats.find((c) => c.user._id === id)?.user;

  const logo = chatUser?.profilePhoto || defaultImg;
  const username = chatUser?.username || "User";
  const isOnline = online?.includes(id);

  function navigateToChatScreen() {
    navigate("/");
  }

  return (
    <div className="select-none sticky z-[10] top-0">
      <div className="p-2 flex items-center flex-row h-[8vh] md:h-[12vh] bg-indigo-400">
        <ArrowLeft
          className="text-white size-8"
          onClick={navigateToChatScreen}
        />

        <div className="relative ml-2">
          <Link to={`/profile/${id}`}>
            <div className="border-black h-11 w-11 rounded-full overflow-hidden border-2 cursor-pointer">
              <img
                src={logo}
                alt="Profile-photo"
                className="h-full w-full object-cover"
              />
            </div>
          </Link>

          {isOnline && (
            <div className="h-3 w-3 absolute rounded-full bottom-0 right-0 bg-green-700 border-2 border-white" />
          )}
        </div>

        <div className="flex-1">
          <div className="overflow-hidden cursor-pointer h-7 ml-4 text-white text-md font-bold inter text-xl">
            {username}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBarforChatPage;
