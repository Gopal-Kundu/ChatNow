import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chats",
  initialState: {
    chats: [],
    msgContainer: [], //For Normal Chats

    groups: [],
    groupMsgContainer: [] //For Group Chats
  },
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setAllMsgs: (state, action) => {
      state.msgContainer = action.payload;
    },
    setMsg: (state, action) => {
      state.msgContainer.push(action.payload);
    },
    setNewChat: (state, action) => {
      const user = action.payload.user ?? action.payload;

      const exists = state.chats.find(
        (chat) => chat.user._id === user._id
      );

      if (!exists) {
        state.chats.push({
          user,
          newMsgCount: 0,
        });
      }
    },

    deleteUser: (state, action) => {
      state.chats = state.chats.filter(
        (chat) => chat.user._id !== action.payload
      );

      state.msgContainer = state.msgContainer.filter(
        msg => msg.senderId !== action.payload && msg.receiverId !== action.payload
      );
    },
    setNewMsgCount: (state, action) => {
      const chat = state.chats.find(
        (u) => u.user._id === action.payload._id
      );
      if (chat) {
        chat.newMsgCount = action.payload.newMsgCount;
      }

    },
    setNewMsgCountToZero: (state, action) => {
      const chat = state.chats.find(
        (u) => u.user._id === action.payload._id
      );
      if (chat) {
        chat.newMsgCount = 0;
      }

    },



    //Groups
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
    setGroupAllMsgs: (state, action) => {
      state.groupMsgContainer = action.payload;
    },
    setGroupMsg: (state, action) => {
      state.groupMsgContainer.push(action.payload);
    },
    setNewGroup: (state, action) => {
      const exists = state.groups.find(
        (u) => u._id === action.payload._id
      );
      if (!exists) state.groups.push(action.payload);
    },
  }
});

export const { setChats, setMsg, setAllMsgs, setNewChat, deleteUser, setNewGroup, setGroupMsg, setGroupAllMsgs, setGroups, setNewMsgCount, setNewMsgCountToZero } = chatSlice.actions;
export default chatSlice.reducer;
