import mongoose from "mongoose";
const connectDB = (url) => {
    mongoose
        .connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            maxPoolSize: 10,
        })
        .then(() => console.log("DB connected"))
        .catch((error) => console.log("something wrong happened", error));
};
// mongoose.connection.on("error", (err) => {
//     console.error("MongoDB connection error:", err);
// });

// mongoose.connection.on("disconnected", () => {
//     console.warn("MongoDB disconnected. Attempting to reconnect...");
//     mongoose.connect(url);
// });

export default connectDB;