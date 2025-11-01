import express from "express";
import {
    addUniversity,
    getSingleUniversity,
    getUniversity,
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
universityRouter.route("/add").post(upload.single("image"), addUniversity);

universityRouter.route("/get").get(getUniversity);
universityRouter.route("/find/:id").get(getSingleUniversity);