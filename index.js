import express from "express";
import cookieParser from "cookie-parser";
import dotnet from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import listingRoutes from "./routes/listing.route.js";

import connectDB from "./database/connectDB.js";
dotnet.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173/",
  credentials: true,
};

app.use(cors(corsOptions));

// app.use("/", (req, res) => res.send("app is running"));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/listing", listingRoutes);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
  connectDB();
});
