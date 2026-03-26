import mongoose from 'mongoose'
const resourceSchema = mongoose.Schema({
    campusId: { type: String },
    departName: { type: String },
    title: { type: String },
    description: { type: String },
    type: { type: String, enum: ['reference', 'exam', 'module', 'other'], default: 'other' },
    fileType: { type: String }, // 'pdf', 'image', 'doc', etc.
    file: { type: String, required: true },
    uploadedBy: { type: String },
    uniId: { type: String },
}, { timestamps: true })
export const resourceModel = mongoose.models.Resource || mongoose.model('Resource', resourceSchema)