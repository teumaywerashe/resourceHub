// import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);
import { universityModel } from "../models/univeristyModel.js";

export const getUniversity = async(req, res) => {
    try {
        const universities = await universityModel.find({});
        res.json({ success: true, uni: universities });
    } catch (error) {
        console.log(error);
        res.json({ success: false, msg: "error" });
    }
};
export const addUniversity = async(req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, msg: "No file uploaded" });
        }

        const university = new universityModel({
            name: req.body.name,
            description: req.body.description,
            foundCity: req.body.foundCity,
            establishedYear: req.body.establishedYear,
            logo: req.file.filename,
            generation: req.body.generation,
            region: req.body.region,
        });

        await university.save();
        res
            .status(201)
            .json({ success: true, msg: "added succesifully", university });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "error" });
    }
};

export const getSingleUniversity = async(req, res) => {
    const id = req.params.id;

    try {
        const university = await universityModel.findOne({ _id: id });
        res.json({ success: true, university });
    } catch (error) {}
};

export const updateUniversity = async(req, res) => {
    const { id } = req.params;
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, msg: "file not uploaded" });
        }
        if (req.file) {
            const uni = await universityModel.findById(id);
            const oldLogoPath = path.join(__dirname, "uploads", uni.logo);
            if (fs.existsSync(oldLogoPath)) {
                fs.unlinkSync(oldLogoPath); // deletes the old logo
            }
        }
        const updateData = {
            name: req.body.name,
            description: req.body.description,
            foundCity: req.body.foundCity,
            establishedYear: req.body.establishedYear,
            logo: req.file.filename,
            generation: req.body.generation,
            region: req.body.region,
        };

        const university = await universityModel.findByIdAndUpdate(id, updateData, {
            new: true,
        });
        if (!university)
            return res
                .status(404)
                .json({ success: false, msg: "university not found" });
        res
            .status(200)
            .json({ success: true, msg: "updated successfully", university });
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ success: false, msg: "server error", error: error.message });
    }
};