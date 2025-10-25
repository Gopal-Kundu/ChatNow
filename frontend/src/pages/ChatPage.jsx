import React from "react";
import LeftSideBar from "../components/LeftSideBar";
import RightSidebar from "../components/RightSidebar";

function chatPage() {
  return (
    <div className='h-screen bg-[url("./src/assets/Background_SignUp_Login_Page.jpg")] bg-cover bg-center '>
      <div className=" bg-black/50">
          <LeftSideBar/>

        {/* <div className="flex h-screen">
          <LeftSideBar/>
        <RightSidebar/>
        </div> */}

      </div>
    </div>
  );
}

export default chatPage;
