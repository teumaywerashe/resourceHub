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
});

export const universityModel =
    mongoose.models.university || mongoose.model("university", universitySchema);