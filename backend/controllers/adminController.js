import { adminModel } from "../models/adminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { universityModel } from "../models/univeristyModel.js";

const createToken = (name, uniId) => {
    return jwt.sign({ name, uniId }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
};
export const registerAdmin = async(req, res) => {
    const { name, email, password, university } = req.body;

    try {
        const exist = await adminModel.findOne({ email });

        if (exist) {
            res.json({ success: false, msg: "User already exists, please login" });
        } else {
            if (!validator.isEmail(email)) {
                return res.json({ success: false, msg: "please insert valid email" });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newAdmin = new adminModel({
                name,
                email,
                password: hashedPassword,
                university: university,
            });
            const user = await newAdmin.save();
            const foundUniversity = await universityModel.findOne({
                name: user.university,
            });
            if (!foundUniversity) {
                return res.json({ success: false, msg: "no univeristy found" });
            }
            const uniId = foundUniversity._id.toString();
            console.log(uniId);
            const token = createToken(user.name, uniId);
            res.json({ success: true, token, uniId });
        }
    } catch (error) {
        console.error("Register error:", error);
        res.json({ success: false, msg: "Something went wrong" });
    }
};

export const loginAdmin = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await adminModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, msg: "no admin with this email" });
        }
        const correctPassword = await bcrypt.compare(password, user.password);
        if (!correctPassword) {
            return res.json({ success: false, msg: "wrong password" });
        }
        const foundUniversity = await universityModel.findOne({
            name: user.university,
        });
        if (!foundUniversity) {
            return res.json({ success: false, msg: "no univeristy found" });
        }
        const uniId = foundUniversity._id.toString();
        console.log(uniId);
        const token = createToken(user.name, uniId);
        res.json({ success: true, token, uniId });
    } catch (error) {
        console.log(error);
        res.json({ success: false, msg: "something error happened" });
    }
};

export const getAdminUniversity = async(req, res) => {
    try {
        // console.log(req.uniId);
        const university = await universityModel.findById(req.uniId);
        if (!university) {
            return res.json({ success: false, msg: "University not found" });
        }
        res.json({ success: true, university: university });
    } catch (error) {
        console.log(error);
        res.json({ success: false, msg: "error" });
    }
};