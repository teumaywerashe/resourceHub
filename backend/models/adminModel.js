import mongoose, { mongo } from "mongoose";
const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    university: {
        type: String,
        required: true
    }
})



export const adminModel = mongoose.models.admin || mongoose.model("admin", adminSchema)