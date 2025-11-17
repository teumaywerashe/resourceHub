import mongoose from 'mongoose'
const resourceSchema = mongoose.Schema({
    campusId: {
        type: String
    },
    departName: { type: String },
    title: { type: String },
    description: { type: String },
    file: { type: String, required: true }
})
export const resourceModel = mongoose.models.Resource || mongoose.model('Resource', resourceSchema)