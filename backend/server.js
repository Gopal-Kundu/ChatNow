import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./configs/database.js";
import routes from "./routes/user.route.js";
import cookieParser from "cookie-parser";
dotenv.config({ quiet: true });

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/", routes);
const port = process.env.PORT || 2000;
app.listen(port, ()=>{
    connectDB();
    console.log(`Server running on:\n http://localhost:${port}`);
})