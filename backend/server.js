import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./configs/database.js";
import routes from "./routes/user.route.js";
import groupRouter from "./routes/group.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/", routes);
app.use("/", groupRouter);

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    credentials: true,
  },
});

export let onlineUsers = {};
export let activeChats = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("Connect me", (userId) => {
    socket.userId = userId;
    onlineUsers[userId] = socket.id;
    io.emit("Connected users", Object.keys(onlineUsers));
  });

  socket.on("ACTIVE_CHAT", (chatUserId) => {
    if (socket.userId) {
      activeChats[socket.userId] = chatUserId;
    }
  });

  socket.on("disconnect", () => {
    for (let [k, v] of Object.entries(onlineUsers)) {
      if (v === socket.id) delete onlineUsers[k];
    }
    delete activeChats[socket.userId];
    io.emit("Disconnected users", Object.keys(onlineUsers));
  });
});

app.get("/", (req, res) => {
  res.json({ message: "Server running" });
});

const port = process.env.PORT || 2005;
server.listen(port, () => {
  connectDB();
  console.log(`Server running on http://localhost:${port}`);
});
