import express from "express";
import connectDB from "./config/db.js";
import "dotenv/config.js";
import cors from "cors";
import path from "path";
import { universityRouter } from "./routes/univeristyRouter.js";
import { adminRouter } from "./routes/adminRouter.js";
import { userRouter } from "./routes/userRouter.js";
import { campusRouter } from "./routes/campusRouter.js";
import { resourceRoute } from "./routes/resourceRoute.js";
import { newsRouter } from "./routes/newsRoute.js";
const app = express();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/uploads/resources", express.static("uploads/resources"));
app.use("/api/university", universityRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/campus", campusRouter);
app.use("/api/resources", resourceRoute);
app.use("/api/news", newsRouter);

const start = () => {
  try {
    connectDB(process.env.MONGO_URL);
    app.listen(3000, () => {
      console.log("server listing on port 3000..");
    });
  } catch (error) {
    console.log(error);
  }
};
start();
