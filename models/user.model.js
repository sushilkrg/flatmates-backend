import mongoose from "mongoose";
import Listing from "./listing.model.js";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    myListings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
        default: [],
      },
    ],
    mySaveForLaterListings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
        default: [],
      },
    ],
  },
  { timestamp: true }
);

const User = mongoose.model("User", userSchema);
export default User;
