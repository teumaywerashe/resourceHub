import { newsModel } from "../models/newsModule.js";
import { universityModel } from "../models/univeristyModel.js";

export const getNews = async(req, res) => {
    try {
        const news = await newsModel.find({});
        if (news) {
            res.status(200).json({ success: true, news })
        } else {
            res.status(400).json({ success: false, msg: "No news found!" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server Error" })
    }
};

export const getNew = async(req, res) => {
    try {
        const { id } = req.params
        const newNew = await newsModel.findById(id)
        if (newNew) {
            const uniId = newNew.uniId
            const newUni = await universityModel.findById(uniId)
            res.status(200).json({ success: true, newNew, newUni })
        } else {
            res.status(400).json({ success: false, msg: "new not found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" })
    }
}

export const addNew = async(req, res) => {
    try {
        const { title, content, uniId } = req.body
        const data = {
            uniId,
            image: req.file.filename,
            title,
            content
        }
        const newNew = new newsModel(data)
        await newNew.save()
        res.status(201).json({ success: true, msg: "added succesifully", newNew });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" })
    }
}