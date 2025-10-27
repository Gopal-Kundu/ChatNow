import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chats",
  initialState: {
    chats: null,
    msgContainer: []
  },
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setAllMsgs: (state, action)=>{
      state.msgContainer = action.payload;
    },
    setMsg:(state, action) => {
      state.msgContainer.push(action.payload);
    },
  }
});
 
export const { setChats, setMsg, setAllMsgs} = chatSlice.actions;
export default chatSlice.reducer;
