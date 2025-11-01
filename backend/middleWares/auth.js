import jwt from "jsonwebtoken";
import { universityModel } from "../models/univeristyModel.js";
export const authMiddleware = async(req, res, next) => {
    try {
        const { adminToken } = req.headers;
        // const { userToken } = req.headers;
        if (!adminToken) {
            //   console.log(req.headers);
            return res.json({ success: false, msg: "not authorised access" });
        }
        const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);
        req.userName = decoded.name;
        req.uniId = decoded.uniId;
        req.university = await universityModel.findById(req.uniId);
        console.log(req.university);
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, msg: "error" });
    }
};