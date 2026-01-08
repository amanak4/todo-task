import express from "express";
import { login, signup, logout, profile } from "./controller.js";
import authorized from "../middleware/authorized.js";

const router = express.Router();

router.post("/login", login);    
router.post("/signup", signup);  
router.get("/logout", authorized, logout);
router.get("/profile", authorized, profile);

export default router;
