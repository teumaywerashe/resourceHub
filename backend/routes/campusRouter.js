import express from "express";
import {
    addCampus,
    deleteCampus,
    getAllCampus,
    getCampus,
} from "../controllers/campusController.js";
import multer from "multer";

export const campusRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

campusRouter.route("/get").get(getAllCampus);
campusRouter.route("/find/:id").get(getCampus);
campusRouter.route("/delete/:id").delete(deleteCampus);

campusRouter.route("/add").post(upload.single("logo"), addCampus);