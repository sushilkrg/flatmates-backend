import mongoose from "mongoose";
import User from "./user.model.js";

const listingSchema = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postedByName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    cityName: {
      type: String,
      required: true,
    },
    nearestPlace: {
      type: String,
      required: true,
    },
    rent: {
      type: String,
      required: true,
    },
    lookingForGender: {
      type: String,
      enum: ["male", "female", "any"],
      default: "any",
      required: true,
    },
    lookingForAccoType: {
      type: String,
      enum: ["flatmate", "roommate"],
      default: "flatmate",
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    facilities: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      default: "",
    },
    savedForLaterBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);
export default Listing;
