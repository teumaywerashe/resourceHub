import mongoose, { mongo } from "mongoose"

const newSchema = new mongoose.Schema({
    image: { type: String },
    uniId: { type: String, required: true },
    title: { type: String, required: true },
    expired: { type: Boolean, default: false },
    content: { type: String, required: true }

}, { timestamps: true })

export const newsModel = mongoose.models.News || mongoose.model('News', newSchema)