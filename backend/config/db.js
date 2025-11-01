import mongoose from "mongoose";
const connectDB = (url) => {
    mongoose
        .connect(url, {})
        .then(() => console.log("DB connected"))
        .catch((error) => console.log("something wrong happened", error));
};

export default connectDB;