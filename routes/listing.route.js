import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
  addListing,
  deleteListing,
  getAllListings,
  getFilteredListings,
  getFlatmate,
  getListingDetails,
  getMyListings,
  getRoommate,
  getSaveForLaterListings,
  saveForLater,
  searchListingsByCityname,
} from "../controllers/listing.controller.js";

const router = express.Router();

router.get("/", getAllListings);
router.get("/details/:id", getListingDetails);
router.post("/add", isAuthenticated, addListing);
router.post("/saveforlater/:id", isAuthenticated, saveForLater);
router.delete("/:id", isAuthenticated, deleteListing);
router.get("/saveforlater", isAuthenticated, getSaveForLaterListings);
router.get("/mylistings", isAuthenticated, getMyListings);
router.get("/search/:cityname", searchListingsByCityname);
router.get("/filter", getFilteredListings);
router.get("/flatmate", getFlatmate);
router.get("/roommate", getRoommate);

export default router;
