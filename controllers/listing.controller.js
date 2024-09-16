import Listing from "../models/listing.model.js";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/user.model.js";

export const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find();

    if (listings.length == 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json(listings);
  } catch (error) {
    console.log("Error in getAllListings", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getListingDetails = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const listingId = id;
    const listingDetails = await Listing.findById(listingId);
    if (!listingDetails) {
      return res.status(404).json({ message: "Listing not found" });
    }
    return res.status(200).json(listingDetails);
  } catch (error) {
    console.log("Error in getListingDetails", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addListing = async (req, res) => {
  try {
    const {
      postedByName,
      location,
      cityName,
      nearestPlace,
      rent,
      lookingforGender,
      lookingForAccoType,
      contactNumber,
      facilities,
    } = req.body;
    let { img } = req.body;
    const userId = req.user?._id.toString(); //.toString()

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    // console.log(user);

    if (
      !postedByName ||
      !location ||
      !cityName ||
      !nearestPlace ||
      !rent ||
      !lookingforGender ||
      !lookingForAccoType ||
      !contactNumber
      // ||
      //  !img
    ) {
      return res.status(400).json({ error: "User must fill required data" });
    }

    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img);
      img = uploadedResponse.secure_url;
    }

    const newListing = new Listing({
      postedBy: userId,
      postedByName,
      location,
      cityName,
      nearestPlace,
      rent,
      lookingforGender,
      lookingForAccoType,
      contactNumber,
      facilities,
      img,
    });
    // const newListing = new Listing({
    //   postedBy: userId,
    //   postedByName: req.body.postedByName,
    //   location: req.body.location,
    //   cityName: req.body.cityName,
    //   nearestPlace: req.body.nearestPlace,
    //   rent: req.body.rent,
    //   lookingforGender: req.body.lookingforGender,
    //   lookingForAccoType: req.body.lookingForAccoType,
    //   contactNumber: req.body.contactNumber,
    //   facilities: req.body.facilities,
    //   img: img,
    // });

    await newListing.save();
    await User.updateOne(
      { _id: userId },
      { $push: { myListings: newListing?._id } }
    );
    return res
      .status(200)
      .json({ newListing, message: "New Listing added successfully" });
  } catch (error) {
    console.log("Error in addListing", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const saveForLater = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: listingId } = req.params;
    console.log(userId);

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ error: "Listing Not Found" });
    }

    const userSavedForLaterListing = listing.savedForLaterBy.includes(userId);
    if (userSavedForLaterListing) {
      // remove from saveForLater
      await Listing.updateOne(
        { _id: listingId },
        { $pull: { savedForLaterBy: userId } }
      );
      await User.updateOne(
        { _id: userId },
        { $pull: { mySaveForLaterListings: listingId } }
      );

      const updateSaveForLaterListings = listing.savedForLaterBy.filter(
        (id) => id.toString() !== userId.toString()
      );

      res.status(200).json({
        updateSaveForLaterListings,
        message: "User removed listing from saveForLater",
        success: true,
      });
    } else {
      // add to saveForLater
      listing.savedForLaterBy.push(userId);
      await User.updateOne(
        { _id: userId },
        { $push: { mySaveForLaterListings: listingId } }
      );
      await listing.save();

      res.status(200).json({
        message: "User added this to saveForLater",
        success: true,
      });
    }
  } catch (error) {
    console.log("Error in saveForLater", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteListing = async (req, res) => {
  try {
    const listingId = req.params.id;
    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    if (listing?.postedBy.toString() != req.user._id.toString()) {
      return res
        .status(401)
        .json({ error: "You cannot delete other user listing" });
    }

    if (listing.img) {
      const imgId = listing.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }

    await User.updateOne(
      { _id: req.user._id },
      { $pull: { myListings: listing?._id } }
    );
    await Listing.findByIdAndDelete(listingId);
    return res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    console.log("Error in deleteListing", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSaveForLaterListings = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("mySaveForLaterListings");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userSavedForLaterListings = user?.mySaveForLaterListings;
    // todo - use populate

    if (userSavedForLaterListings.length == 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(userSavedForLaterListings);
  } catch (error) {
    console.log("Error in getSaveForLaterListings", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMyListings = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("myListings");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const myListings = user?.myListings;
    res.status(200).json(myListings);
  } catch (error) {
    console.log("Error in getMyListings", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const searchListingsByCityname = async (req, res) => {
  try {
    const { cityname } = req.params;

    const allListings = await Listing.find();

    const filteredListings = allListings.filter((listing) =>
      listing.cityName.toLowerCase().includes(cityname.toLowerCase())
    );

    if (!filteredListings) {
      return res.status(404).json({ error: "Not Found" });
    }

    return res.status(200).json({ filteredListings });
  } catch (error) {
    console.log(
      "Error in searchListingsByCityname controller: ",
      error.message
    );
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getFilteredListings = async (req, res) => {
  try {
    const { lookingFor, cityname } = req.query;

    const listings = await Listing.find();
    let filteredListings;

    if (lookingFor == "all") {
      filteredListings = listings;
    }

    if (lookingFor == "male") {
      filteredListings = listings.filter(
        (listing) => listing.lookingForGender !== "female"
      );
    }

    if (lookingFor == "female") {
      filteredListings = listings.filter(
        (listing) => listing.lookingForGender !== "male"
      );
    }

    if (cityname) {
      filteredListings = filteredListings.filter((listing) =>
        listing.cityName.toLowerCase().includes(cityname.toLowerCase())
      );
    }

    // if (priceMin) {
    //   filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(priceMin));
    // }

    // if (priceMax) {
    //   filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(priceMax));
    // }

    // const filteredData = data.filter(user => {
    //   return user.age > 25 && user.city === 'New York';
    // });

    res.status(200).json(filteredListings);
  } catch (error) {
    console.log("Error in filterListing controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getFlatmate = async (req, res) => {
  try {
    const listings = await Listing.find();

    const flatmateListings = listings.filter(
      (listing) => listing.lookingForAccoType === "flatmate"
    );
    if (flatmateListings.length == 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json(flatmateListings);
  } catch (error) {
    console.log("Error in getFlatmate controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getRoommate = async (req, res) => {
  try {
    const listings = await Listing.find();

    const roommateListings = listings.filter(
      (listing) => listing.lookingForAccoType === "roommate"
    );
    if (roommateListings.length == 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json(roommateListings);
  } catch (error) {
    console.log("Error in getRoommate controller: ", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};