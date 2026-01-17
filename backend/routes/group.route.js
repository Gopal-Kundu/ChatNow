import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { upload } from "../middleware/multer.js";
import { createGroup } from "../controllers/group.controller.js";

const groupRouter = express.Router();
groupRouter.post("/group/create", isAuthenticated, upload.single("logo"), createGroup);


export default groupRouter;
