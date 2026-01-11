import React, { useEffect } from "react";
import LoadingPage from "../pages/LoadingPage";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import axios from "axios";
import { setAllMsgs } from "../../redux/chatSlice";
import { baseurl } from "../../address/address";

function ChatSection({ theirId }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth?.loading);
  const msgs = useSelector((state) => state.chat?.msgContainer);

  useEffect(() => {
    async function fetchData() {
      dispatch(setAllMsgs([]));
      try {
        dispatch(setLoading(true));
        const res = await axios.get(`${baseurl}/chat/${theirId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllMsgs(res.data.messages));
        }
      } catch (error) {
        console.log(error.response);
      } finally {
        dispatch(setLoading(false));
      }
    }

    fetchData();
  }, [theirId]);

  return (
    <div className="webkit-scrollbar flex-1 overflow-y-auto">
      {loading ? (
        <LoadingPage />
      ) : (
        <div>
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
