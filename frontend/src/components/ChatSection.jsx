import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingPage from "../pages/LoadingPage";
import Message from "../components/Message";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import { baseurl } from "../../address/address";

function ChatSection({ theirId }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const myId = useSelector((state) => state.auth.user._id);

  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        dispatch(setLoading(true));
        setMsgs([]); 

        const res = await axios.get(`${baseurl}/${theirId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          setMsgs(res.data.messages); 
          console.log("Fetched messages:", res.data.messages);
        }
      } catch (error) {
        console.log(error.response);
      } finally {
        dispatch(setLoading(false));
      }
    }

    if (theirId) fetchData();
  }, [theirId]);

  return (
    <div className="webkit-scrollbar flex-1 overflow-y-auto">
      {loading ? (
        <LoadingPage />
      ) : (
        <div>
          {msgs.map((msg, idx) => (
            <Message
              key={idx}
              user={msg.senderId === myId ? "true" : "false"}
              text={msg.message}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ChatSection;
