import { login, register, update } from "../controllers/user.controller.js";
import express from "express";

const router = express.Router();
router.post("/register", register);
router.post("/update", update);
router.post("/login", login);
export default router;