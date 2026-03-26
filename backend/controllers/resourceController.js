import { resourceModel } from "../models/resourcesModel.js";
import path from "path";
import fs from "fs";

export const getResources = async (req, res) => {
    try {
        const { campusId, type, departName } = req.query;
        const filter = {};
        if (campusId) filter.campusId = campusId;
        if (type) filter.type = type;
        if (departName) filter.departName = departName;

        const resources = await resourceModel.find(filter).sort({ createdAt: -1 });
        res.status(200).json({ success: true, resources });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
};

export const getResource = async (req, res) => {
    const { id } = req.params;
    try {
        const resource = await resourceModel.findById(id);
        if (resource) {
            res.status(200).json({ success: true, resource });
        } else {
            res.status(404).json({ success: false, msg: "file not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
};

export const uploadResource = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, msg: "No file uploaded" });
        }
        const ext = path.extname(req.file.originalname).toLowerCase();
        let fileType = "other";
        if ([".pdf"].includes(ext)) fileType = "pdf";
        else if ([".doc", ".docx"].includes(ext)) fileType = "doc";
        else if ([".ppt", ".pptx"].includes(ext)) fileType = "ppt";
        else if ([".jpg", ".jpeg", ".png", ".gif"].includes(ext)) fileType = "image";
        else if ([".mp4", ".mkv", ".avi"].includes(ext)) fileType = "video";

        const data = {
            campusId: req.body.campusId,
            title: req.body.title,
            type: req.body.type || "other",
            departName: req.body.departName,
            description: req.body.description,
            file: req.file.filename,
            fileType,
            uploadedBy: req.userName || "Admin",
            uniId: req.uniId || req.body.uniId,
        };
        const resource = await resourceModel.create(data);
        res.status(201).json({ success: true, msg: "Resource uploaded successfully", resource });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
};

export const deleteResource = async (req, res) => {
    const { id } = req.params;
    try {
        const resource = await resourceModel.findById(id);
        if (!resource) {
            return res.status(404).json({ success: false, msg: "Resource not found" });
        }
        // Delete file from disk
        const filePath = path.join("uploads", "resources", resource.file);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        await resourceModel.findByIdAndDelete(id);
        res.status(200).json({ success: true, msg: "Resource deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
};
