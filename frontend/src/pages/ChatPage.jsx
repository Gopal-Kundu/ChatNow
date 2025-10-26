import React, { useEffect } from "react";
import LeftSideBar from "../components/LeftSideBar";
import { setLoading } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { baseurl } from "../../address/address";
import axios from "axios";
import { setChats } from "../../redux/chatSlice";
import LoadingPage from "./LoadingPage";

function ChatPage() {
  const dispatch = useDispatch();
  const loading = useSelector((state)=>state.auth.loading);
  const chat = useSelector((state)=>state.chat.chats);
  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const res = await axios.get(`${baseurl}/getAllChats`,{
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setChats(res.data.users));
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  },[dispatch]);
  return (
    <div className='h-screen bg-[url("./src/assets/Background_SignUp_Login_Page.jpg")] bg-cover bg-center '>
      <div className=" bg-black/50 bg-screen">
        {loading ? <LoadingPage/> : <LeftSideBar />}
      </div>
    </div>
  );
}

export default ChatPage;
