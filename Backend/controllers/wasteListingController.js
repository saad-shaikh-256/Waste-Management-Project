import WasteListing from "../models/wasteListingModel.js";

// @desc    Create a new waste listing
// @route   POST /api/listings
// @access  Private
const createListing = async (req, res) => {
  const { wasteType, quantity, location, description } = req.body;

  if (!wasteType || !quantity || !location) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  try {
    const listing = new WasteListing({
      wasteType,
      quantity,
      location,
      description,
      user: req.user._id, // Get the user ID from the auth middleware
    });

    const createdListing = await listing.save();
    res.status(201).json(createdListing);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get all waste listings
// @route   GET /api/listings
// @access  Public
const getListings = async (req, res) => {
  try {
    const listings = await WasteListing.find({}).populate("user", "fullName"); // Populate with user's name
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getMyListings = async (req, res) => {
  try {
    // req.user is attached by our 'protect' middleware
    const listings = await WasteListing.find({ user: req.user._id });
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const updateListing = async (req, res) => {
  try {
    const listing = await WasteListing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Check if the logged-in user is the owner of the listing
    if (listing.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "User not authorized" });
    }

    // Update the fields
    listing.wasteType = req.body.wasteType || listing.wasteType;
    listing.quantity = req.body.quantity || listing.quantity;
    listing.location = req.body.location || listing.location;
    listing.description = req.body.description || listing.description;
    listing.status = req.body.status || listing.status;

    const updatedListing = await listing.save();
    res.status(200).json(updatedListing);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Delete a waste listing
// @route   DELETE /api/listings/:id
// @access  Private
const deleteListing = async (req, res) => {
  try {
    const listing = await WasteListing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Check if the logged-in user is the owner
    if (listing.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "User not authorized" });
    }

    await listing.deleteOne();
    res.status(200).json({ message: "Listing removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export {
  createListing,
  getListings,
  getMyListings,
  updateListing,
  deleteListing,
};
