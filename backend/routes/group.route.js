import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { upload } from "../middleware/multer.js";
import { createGroup, sendGroupMessage } from "../controllers/group.controller.js";

const groupRouter = express.Router();
groupRouter.post("/group/create", isAuthenticated, upload.single("logo"), createGroup);
groupRouter.post("/send-msg-to-group/:groupId", isAuthenticated, sendGroupMessage);

export default groupRouter;
