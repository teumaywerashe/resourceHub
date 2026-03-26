// import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { universityModel } from "../models/univeristyModel.js";

export const getUniversity = async (req, res) => {
  try {
    const universities = await universityModel.find({});
    res.json({ success: true, uni: universities });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: "error" });
  }
};
export const addUniversity = async (req, res) => {
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

export const getSingleUniversity = async (req, res) => {
  const id = req.params.id;

  try {
    const university = await universityModel.findOne({ _id: id });
    res.json({ success: true, university });
  } catch (error) {}
};

export const updateUniversity = async (req, res) => {
  const { id } = req.params;
  try {
    const uni = await universityModel.findById(id);
    if (!uni) {
      return res.status(404).json({ success: false, msg: "university not found" });
    }

    if (req.file) {
      // go up two levels from controllers/ to reach the project root uploads/
      const oldLogoPath = path.join(__dirname, "..", "uploads", uni.logo);
      if (fs.existsSync(oldLogoPath)) {
        fs.unlinkSync(oldLogoPath);
      }
    }

    const updateData = {
      name: req.body.name || uni.name,
      description: req.body.description || uni.description,
      foundCity: req.body.foundCity || uni.foundCity,
      establishedYear: req.body.establishedYear || uni.establishedYear,
      logo: req.file ? req.file.filename : uni.logo,
      generation: req.body.generation || uni.generation,
      region: req.body.region || uni.region,
    };

    const university = await universityModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.status(200).json({ success: true, msg: "updated successfully", university });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "server error", error: error.message });
  }
};
