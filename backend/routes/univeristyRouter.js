import express from "express";
import {
    addUniversity,
    getSingleUniversity,
    getUniversity,
    updateUniversity,
} from "../controllers/universityControllers.js";
import multer from "multer";
export const universityRouter = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });



universityRouter.get("/get", getUniversity).get("/find/:id", getSingleUniversity).post("/add", upload.single("logo"), addUniversity).patch("/update/:id", upload.single("logo"), updateUniversity);