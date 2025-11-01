import axios from "axios";
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
