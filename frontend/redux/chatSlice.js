import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chats",
  initialState: {
    chats: [],
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
    setNewChat:(state, action) => {
      const exists = state.chats.find(
        (u) => u._id === action.payload._id
      );
      if (!exists) state.chats.push(action.payload);
    }
  }
});
 
export const { setChats, setMsg, setAllMsgs,setNewChat} = chatSlice.actions;
export default chatSlice.reducer;
