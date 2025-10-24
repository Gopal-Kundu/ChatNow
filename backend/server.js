import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./configs/database.js";
import routes from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config({ quiet: true });

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use("/", routes);
const port = process.env.PORT;
app.listen(port, ()=>{
    connectDB();
    console.log(`Server running on:\n http://localhost:${port}`);
})