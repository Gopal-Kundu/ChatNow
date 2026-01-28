import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import defaultImg from "../assets/defaultUser.png";

function NavBarforGroupPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const groups = useSelector((state) => state.chat.groups) || [];

  const specificGroup = groups.find((c) => c._id === id);

  const logo = specificGroup?.logo;
  const name = specificGroup?.groupName || "Group";

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
        </div>

        <div className="flex-1">
          <div className="overflow-hidden cursor-pointer h-7 ml-4 text-white text-md font-bold inter text-xl">
            {name}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBarforGroupPage;
