import mongoose from "mongoose";

const universitySchema = mongoose.Schema({
    logo: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    generation: {
        type: String,
        required: true,
    },
    region: {
        type: String,
        required: true,
    },
    foundCity: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    establishedYear: {
        type: String,
        required: true,
    },
    contact: {
        address: { type: String, default: "" },
        phone1: { type: String, default: "" },
        phone2: { type: String, default: "" },
        email1: { type: String, default: "" },
        email2: { type: String, default: "" },
        website: { type: String, default: "" },
        facebook: { type: String, default: "" },
        twitter: { type: String, default: "" },
        linkedin: { type: String, default: "" },
    },
});

export const universityModel =
    mongoose.models.university || mongoose.model("university", universitySchema);