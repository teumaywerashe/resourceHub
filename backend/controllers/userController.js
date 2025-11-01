import { userModel } from "../models/userModel.js"
import jwt from 'jsonwebtoken'
import validator from 'validator'
import bcrypt from "bcrypt"
const createToken = (name) => {
    return jwt.sign({ name }, process.env.JWT_SECRET, { expiresIn: "24h" })
}
export const loginUser = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, msg: "user not exist" });
        }
        const correctPassword = await bcrypt.compare(password, user.password);
        if (!correctPassword) {
            return res.json({ success: false, msg: "wrong password" });
        }
        const token = createToken(user.name);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, msg: "something error happened" });
    }

}
export const registerUser = async(req, res) => {

    const { name, email, password } = req.body;

    try {
        const exist = await userModel.findOne({ email });

        if (exist) {
            res.json({ success: false, msg: "User already exists, please login" });
        } else {
            if (!validator.isEmail(email)) {
                return res.json({ success: false, msg: "please insert valid email" });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new userModel({
                name,
                email,
                password: hashedPassword,
            });
            const user = await newUser.save();

            const token = createToken(user.name);
            res.json({
                success: true,
                token,
            });
        }
    } catch (error) {
        console.error("Register error:", error);
        res.json({ success: false, msg: "Something went wrong" });
    }
}