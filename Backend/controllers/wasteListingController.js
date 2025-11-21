import WasteListing from "../models/wasteListingModel.js";

// Helper to calculate highest bid
const addCurrentBid = (listing) => {
  const listingObj = listing.toObject();
  if (listingObj.bids && listingObj.bids.length > 0) {
    const maxBid = Math.max(...listingObj.bids.map((b) => b.amount));
    listingObj.currentBid = maxBid;
    listingObj.bidCount = listingObj.bids.length;
  } else {
    listingObj.currentBid = 0;
    listingObj.bidCount = 0;
  }
  return listingObj;
};

// @desc    Create a new waste listing
const createListing = async (req, res) => {
  const { wasteType, quantity, location, description, pickupDate } = req.body;

  if (!wasteType || !quantity || !location) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  try {
    const imagePath = req.file ? req.file.path : null;

    const listing = new WasteListing({
      wasteType,
      quantity,
      location,
      description,
      pickupDate,
      image: imagePath,
      user: req.user._id,
    });

    const createdListing = await listing.save();
    res.status(201).json(createdListing);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get all waste listings (Updated for Admin Visibility)
const getListings = async (req, res) => {
  try {
    const listings = await WasteListing.find({})
      .populate("user", "fullName email") // Populate Seller info
      .populate("collectedBy", "fullName email") // Populate Buyer info
      .sort({ createdAt: -1 });

    const listingsWithBid = listings.map((l) => addCurrentBid(l));
    res.status(200).json(listingsWithBid);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get Single Listing by ID
const getListingById = async (req, res) => {
  try {
    const listing = await WasteListing.findById(req.params.id).populate(
      "user",
      "fullName email"
    );

    if (listing) {
      res.json(addCurrentBid(listing));
    } else {
      res.status(404).json({ message: "Listing not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Place a Bid
const placeBid = async (req, res) => {
  const { amount } = req.body;

  try {
    const listing = await WasteListing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.bids.length > 0) {
      const highestBid = Math.max(...listing.bids.map((b) => b.amount));
      if (Number(amount) <= highestBid) {
        return res
          .status(400)
          .json({ message: "Bid must be higher than current bid" });
      }
    }

    const bid = {
      amount: Number(amount),
      bidder: req.user._id,
      timestamp: Date.now(),
    };

    listing.bids.push(bid);
    await listing.save();

    res.status(201).json({
      message: "Bid placed successfully",
      listing: addCurrentBid(listing),
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get logged-in user's listings
const getMyListings = async (req, res) => {
  try {
    const listings = await WasteListing.find({ user: req.user._id })
      .populate("user", "fullName")
      .sort({ createdAt: -1 });

    const listingsWithBid = listings.map((l) => addCurrentBid(l));
    res.status(200).json(listingsWithBid);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Update Listing
const updateListing = async (req, res) => {
  try {
    const listing = await WasteListing.findById(req.params.id);

    if (!listing) return res.status(404).json({ message: "Listing not found" });
    if (listing.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "User not authorized" });
    }

    listing.wasteType = req.body.wasteType || listing.wasteType;
    listing.quantity = req.body.quantity || listing.quantity;
    listing.location = req.body.location || listing.location;
    listing.description = req.body.description || listing.description;
    listing.status = req.body.status || listing.status;

    const updatedListing = await listing.save();
    await updatedListing.populate("user", "fullName");

    res.status(200).json(updatedListing);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Delete Listing
const deleteListing = async (req, res) => {
  try {
    const listing = await WasteListing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    if (listing.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "User not authorized" });
    }
    await listing.deleteOne();
    res.status(200).json({ message: "Listing removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Mark listing as Collected (Updated)
// @route   PUT /api/listings/:id/collect
const markAsCollected = async (req, res) => {
  try {
    const listing = await WasteListing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.status !== "Available") {
      return res.status(400).json({ message: "Listing is not available" });
    }

    // Update status AND save the collector ID
    listing.status = "Claimed";
    listing.collectedBy = req.user._id; // <--- Save the Buyer's ID

    const updatedListing = await listing.save();
    res.json(updatedListing);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export {
  createListing,
  getListings,
  getListingById,
  placeBid,
  getMyListings,
  updateListing,
  deleteListing,
  markAsCollected,
};
