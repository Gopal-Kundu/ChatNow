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
    setMsg:(state, action) => {
      state.msgContainer = action.payload;
    },
  }
});
 
export const { setChats, setMsg } = chatSlice.actions;
export default chatSlice.reducer;
