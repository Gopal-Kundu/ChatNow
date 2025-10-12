import React, { useState } from "react";
import { Menu, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); 

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div
      className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-black ${
        selectedUser ? "hidden md:block" : ""
      }`}
    >
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <span>Chat Now</span>
          <div className="relative py-2">
            <Menu onClick={toggleMenu} className="cursor-pointer" />
            {menuOpen && (
              <div className="absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100">
                <p
                  onClick={() => navigate("/profile")}
                  className="cursor-pointer text-sm"
                >
                  Edit Profile
                </p>
                <hr className="my-2 border-t border-gray-500" />
                <p className="cursor-pointer text-sm">Logout</p>
              </div>
            )}
          </div>
        </div>
       <div className="flex items-center gap-2 bg-gray-700/50 rounded-xl px-3 py-2 w-full max-w-sm">
  <Search className="text-gray-300 w-5 h-5" />
  <input
    type="text"
    placeholder="Search User..."
    className="bg-transparent border-none outline-none text-white placeholder-gray-200 flex-1 text-sm"
  />
</div>
            
      </div>
    </div>
  );
};

export default Sidebar;
