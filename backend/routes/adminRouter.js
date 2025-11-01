import express from "express";
import {
  getAdminUniversity,
  loginAdmin,
  registerAdmin,
} from "../controllers/adminController.js";
import { authMiddleware } from "../middleWares/auth.js";
export const adminRouter = express.Router();

adminRouter.route("/register").post(registerAdmin);
adminRouter.route("/login").post(loginAdmin);
adminRouter.route("/university").get(authMiddleware, getAdminUniversity);
