import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const DBConnection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${DBConnection?.connection?.host}`);
  } catch (error) {
    console.log(`Error while connecting to DB: ${error?.message}`);
  }
};

export default connectDB;
