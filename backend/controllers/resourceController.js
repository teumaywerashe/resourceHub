import { response } from "express"
import { resourceModel } from "../models/resourcesModel.js"

export const getResources = async(req, res) => {
    try {
        const resources = await resourceModel.find({})
        if (resources) {
            res.status(200).json({ success: true, resources })
        } else {
            res.status(404).json({ success: false, msg: "no resources found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" })
    }
}

export const getResource = async(req, res) => {
    const { id } = req.params
    try {
        const resource = await resourceModel.findById(id)
        if (response) {
            res.status(200).json({ success: true, response })
        } else {
            res.status(400).json({ success: false, msg: "file not found" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, msg: 'server error' })
    }
}

export const uploadResource = async(req, res) => {
    try {

        const data = {
            campusId: req.body.campusId,
            title: req.body.title,
            type: req.body.type,
            deprtName: req.body.deprtName,
            description: req.body.description,
            file: req.file.filename
        }
        const resource = await resourceModel.create(data)
        if (resource) {
            res.status(201).json({ success: true, msg: "file uploadesd" })
        } else {
            res.status(400).json({ succcess: false, msg: "file not uploaded" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" })
    }
}