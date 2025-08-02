import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import listingRoutes from "./routes/listing.route.js";

import connectDB from "./database/connectDB.js";
import { getServerHealth } from "./lib/utils/getServerHealth.js";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));
app.use(cookieParser());

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

app.use(cors(corsOptions));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/listing", listingRoutes);
app.use("/api/v1/health", getServerHealth);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
  connectDB();
});
