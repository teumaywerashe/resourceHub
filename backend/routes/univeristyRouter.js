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



universityRouter.route("/get").get(getUniversity);
universityRouter.route("/find/:id").get(getSingleUniversity);
universityRouter.route("/add").post(upload.single("logo"), addUniversity);
universityRouter.route("/update/:id").patch(upload.single("logo"), updateUniversity);