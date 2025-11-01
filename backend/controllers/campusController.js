import { campusModel } from "../models/campusModel.js";


export const getAllCampus = async(req, res) => {
    try {
        const campuses = await campusModel.find({})
        res.status(200).json({ success: true, campuses })
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, msg: "server error" })
    }
}
export const getCampus = async(req, res) => {
    try {
        const { id } = req.params;
        const campus = await campusModel.find({ uniId: id });
        // console.log(id);
        res.status(200).json({ success: true, id, campus });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, msg: "server error" })
    }
};
export const addCampus = async(req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, msg: "No file uploaded" });
        }

        const campus = new campusModel({
            name: req.body.name,

        });

        await university.save();
        res.status(201).json({ success: true, msg: "added succesifully", university });

    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, msg: "server error" })
    }
}

export const deleteCampus = async(req, res) => {
    try {

    } catch (error) {

    }
}