import { campusModel } from "../models/campusModel.js";

export const getAllCampus = async(req, res) => {
    try {
        const campuses = await campusModel.find({});
        res.status(200).json({ success: true, campuses });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, msg: "server error" });
    }
};
export const getCampus = async(req, res) => {
    try {
        const { id } = req.params;
        let campus = await campusModel.find({ uniId: id })
        if (campus.length === 0) {
            campus = await campusModel.findById(id);

        }

        res.status(200).json({ success: true, id, campus });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, msg: "server error" });
    }
};
export const addCampus = async(req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, msg: "No file uploaded" });
        }
        const campus = new campusModel({
            name: req.body.name,
            logo: req.file.filename,
            uniId: req.body.uniId,
            description: req.body.description,
            departments: JSON.parse(req.body.departments),
        });

        await campus.save();
        res.status(201).json({ success: true, msg: "added succesifully", campus });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, msg: "server error" });
    }
};

export const deleteCampus = async(req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const deleted = await campusModel.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ success: false, msg: "Campus not found" });
        }
        res.status(200).json({ success: true, msg: "deleted successfully" });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "server error",
        });
    }
};

export const updateCampus = async(req, res) => {
    try {
        const updated = await campusModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        if (updated) {
            res.status(200).json({ success: true, msg: "updated successifuly" })
        } else {
            res.status(400).json({ success: false, msg: "error" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "error" })
    }
}