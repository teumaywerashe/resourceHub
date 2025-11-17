import mongoose from "mongoose";

const campusSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    logo: {
        type: String,

    },
    uniId: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    departments: {
        type: Object,
        required: true,
    },
});

export const campusModel =
    mongoose.models.campus || mongoose.model("campus", campusSchema);