import axiosInstance from "./axiosInstance";

const getListings = async () => {
  try {
    const response = await axiosInstance.get("/listings");
    return response.data;
  } catch (error) {
    console.error("Error fetching listings:", error);
    return [];
  }
};

const getListingById = async (id) => {
  try {
    const response = await axiosInstance.get(`/listings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching listing details:", error);
    throw error;
  }
};

const createListing = async (listingData) => {
  try {
    const response = await axiosInstance.post("/listings", listingData);
    return response.data;
  } catch (error) {
    console.error("Error creating listing:", error);
    throw error;
  }
};

const getMyListings = async () => {
  try {
    const response = await axiosInstance.get("/listings/mylistings");
    return response.data;
  } catch (error) {
    console.error("Error fetching my listings:", error);
    return [];
  }
};

const deleteListing = async (id) => {
  try {
    const response = await axiosInstance.delete(`/listings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting listing:", error);
    throw error;
  }
};

const updateListing = async (id, listingData) => {
  try {
    const response = await axiosInstance.put(`/listings/${id}`, listingData);
    return response.data;
  } catch (error) {
    console.error("Error updating listing:", error);
    throw error;
  }
};

const placeBid = async (id, amount) => {
  try {
    const response = await axiosInstance.post(`/listings/${id}/bid`, {
      amount,
    });
    return response.data;
  } catch (error) {
    console.error("Error placing bid:", error);
    throw error;
  }
};

// --- NEW FUNCTION ---
const markListingAsCollected = async (id) => {
  try {
    const response = await axiosInstance.put(`/listings/${id}/collect`, {});
    return response.data;
  } catch (error) {
    console.error("Error collecting listing:", error);
    throw error;
  }
};

export {
  getListings,
  getListingById,
  createListing,
  getMyListings,
  deleteListing,
  updateListing,
  placeBid,
  markListingAsCollected, // Exported
};
