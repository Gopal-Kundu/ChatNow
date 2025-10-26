import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../redux/authSlice';
import axios from 'axios';
import {baseurl} from "../../address/address";
import { setMsg } from '../../redux/chatSlice';
import { Send } from 'lucide-react';

function InputBox({theirId}) {
  const [msg, currMsg] = useState(""); //Msg for input field
  const dispatch = useDispatch();
  const oldMsgs = useSelector((store)=>store.chat.msgContainer);
  async function sendMsg(){
    if (msg.trim() == "") return;
    try{

      dispatch(setLoading(true));
      const res = await axios.post(`${baseurl}/${theirId}`, { "message": msg },{
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if(res.data.success){
        dispatch(setMsg([...oldMsgs, res.data.newMessage]));
        currMsg("");
      }

    }catch(err){
      console.log(err);
    }finally{
      dispatch(setLoading(false));
    }
  }


  return (
    <div className="w-full  absolute bottom-0">
      <div className="h-[10vh] border-1 md:h-[15vh] tracking-wide bg-black flex items-center justify-center gap-3">
        <input
          type="text"
          className="overflow-y-auto bg-white/40 p-2 storyScript text-xl rounded-2xl w-70 md:w-100 focus:bg-white pl-4 outline-none min-h-12"
          placeholder="Write your message here"
          value={msg}
          onChange={(e) => currMsg(e.target.value)}
        />
        <Send
          className="text-white rounded-full border-2 border-white p-2 size-12 cursor-pointer"
          onClick={sendMsg}
        />
      </div>
    </div>
  )
}

export default InputBox