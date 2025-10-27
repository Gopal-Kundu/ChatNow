import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./configs/database.js";
import routes from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import {Server} from "socket.io";

dotenv.config({ quiet: true });

const app = express();
const allowed = [process.env.CLIENT_URL, process.env.MOBILE_URL];
app.use(cors({
    origin: allowed,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use("/", routes);

//SOCKET.IO
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: allowed,
    }
});

io.on("connection",(socket)=>{
    console.log("User is connected",socket.id);
})




const port = process.env.PORT;
server.listen(port, ()=>{
    connectDB();
    console.log(`Server running on:\n http://localhost:${port}`);
})