import React, { useState } from "react";
import { Search } from "lucide-react";
import { CirclePlus } from "lucide-react";
import Chats from "./Chats";
import { useSelector } from "react-redux";
import defaultImg from "../assets/defaultUser.png";
import { Link } from "react-router-dom";

function LeftSideBar() {
  const chat = useSelector((state) => state.chat.chats);
  const user = useSelector((state) => state.auth.user);
  const [search, setSearch] = useState("");
  const logo = user?.profilePhoto;
  // console.log(chat);
  return (
    <div className="bg-transparent max-h-screen border border-white   flex flex-col">
      {/* Search Bar div  */}
      <div className="py-4 border border-white bg-white/40 flex items-center justify-center gap-3">
        <Link to="/update">
          <div className=" border-black h-10 w-10 rounded-full overflow-hidden border-2 cursor-pointer">
            <img src={logo ? logo : defaultImg} alt="Profile-photo" />
          </div>
        </Link>
        <div className="relative">
          <input
            type="text"
            placeholder="Search Conversations"
            className="border border-white focus:bg-white bg-white/50 rounded-xl ml-1 pl-9 w-70 outline-none py-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 ">
            <Search />
          </div>
        </div>
        <CirclePlus className="text-white size-7 cursor-pointer" />
      </div>

      <div className="webkit-scrollbar overflow-y-auto flex-1">
        {chat
          ?.filter((perChat) =>
            perChat?.username.toLowerCase().includes(search.toLowerCase())
          )
          ?.map((perChat, idx) => {
            return (
              <Chats
                key={idx}
                id={perChat?._id}
                name={perChat?.username}
                logo={perChat?.profilePhoto}
              />
            );
          })}
      </div>
    </div>
  );
}

export default LeftSideBar;
