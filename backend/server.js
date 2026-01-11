import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./configs/database.js";
import routes from "./routes/user.route.js";
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

//SOCKET.IO
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    credentials: true,
  }
});

export let onlineUsers = {};

io.on("connection", (socket) => {
  console.log("User is connected", socket.id);
  socket.on("Connect me", (data) => {
    console.log("Got the data", data);
    if (data) {
      onlineUsers[data] = socket.id;
      console.log("Connected Users: ", Object.keys(onlineUsers));
      io.emit("Connected users", Object.keys(onlineUsers));
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    for (let [k, v] of Object.entries(onlineUsers)) {
      if (onlineUsers[k] === socket.id) delete onlineUsers[k];
    }
    console.log("After disconnecting users online ", Object.keys(onlineUsers));
    io.emit("Disconnected users", Object.keys(onlineUsers));
  });
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running!" });
});
const port = process.env.PORT || 2005;
server.listen(port, () => {
  connectDB();
  console.log(`Server running on:\n http://localhost:${port}`);
});
