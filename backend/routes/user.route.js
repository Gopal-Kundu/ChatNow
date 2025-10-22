import { getAllChats, sendMessage } from "../controllers/message.model.js";
import { login, logout, register, update } from "../controllers/user.controller.js";
import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();
router.post("/register", register);
router.post("/update", update);
router.post("/login", login);
router.get("/logout",logout);

router.get("/", isAuthenticated, getAllChats);
router.post("/:id", isAuthenticated, sendMessage);
export default router;