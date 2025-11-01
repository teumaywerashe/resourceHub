import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
})


//export const universityModel = mongoose.models.university || mongoose.model('university', universitySchema)
export const userModel = mongoose.models.user || mongoose.model('user', userSchema)