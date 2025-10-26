import React, { useEffect } from "react";
import LoadingPage from "../pages/LoadingPage";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import axios from "axios";
import { setMsg } from "../../redux/chatSlice";
import {baseurl} from "../../address/address";




function ChatSection({ theirId }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const msgs = useSelector((state) => state.chat.msgContainer);

  useEffect(()=>{

    async function fetchData(){
      try{
        dispatch(setLoading(true));
        const res = await axios.get(`${baseurl}/${theirId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setMsg(res.data.messages));
          console.log("Data at chatSection", res.data.messages);
        }

      }catch(error){
        console.log(error.response);
      }finally{
        dispatch(setLoading(false));
      }
    }




  fetchData();
  },[]);













  return (
    <div>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="flex flex-col overflow-y-auto gap-3">
          {msgs.map((arr, idx) => {
            return (
              <Message
                key={idx}
                user={theirId === arr.senderId ? "false" : "true"}
                text={arr.message}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ChatSection;
