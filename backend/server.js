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
const allowed = process.env.CLIENT_URL;
app.use(
  cors({
    origin: allowed,
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
    origin: allowed,
    credentials: true,
  },
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

const port = process.env.PORT;
server.listen(port, () => {
  connectDB();
  console.log(`Server running on:\n http://localhost:${port}`);
});
