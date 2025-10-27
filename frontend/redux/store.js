import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import chatSlice from "./chatSlice.js";
import socketSlice from "./socketSlice.js";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    chat: chatSlice,
    socket: socketSlice,
  }
});

 