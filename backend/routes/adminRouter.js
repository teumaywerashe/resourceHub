import express from "express";
import {
    getAdminUniversity,
    loginAdmin,
    registerAdmin,
} from "../controllers/adminController.js";
import { authMiddleware } from "../middleWares/auth.js";
export const adminRouter = express.Router();

adminRouter.post("/register", registerAdmin).post("/login", loginAdmin).get("/university", authMiddleware, getAdminUniversity);