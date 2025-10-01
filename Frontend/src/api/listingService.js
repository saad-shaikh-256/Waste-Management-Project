import axiosInstance from "./axiosInstance";

// Function to fetch all listings from the backend
const getListings = async () => {
  try {
    const response = await axiosInstance.get("/listings");
    return response.data;
  } catch (error) {
    console.error("Error fetching listings:", error);
    // In a real app, you might want to handle this error more gracefully
    return [];
  }
};

// Function to create a new listing
// This will automatically include the user's token because of our axios interceptor
const createListing = async (listingData) => {
  try {
    const response = await axiosInstance.post("/listings", listingData);
    return response.data;
  } catch (error) {
    console.error("Error creating listing:", error);
    throw error; // Throw the error so the component can handle it (e.g., show an error message)
  }
};

const getMyListings = async () => {
  try {
    // The token will be sent automatically by the axios interceptor
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

// Function to update a listing by its ID
const updateListing = async (id, listingData) => {
  try {
    const response = await axiosInstance.put(`/listings/${id}`, listingData);
    return response.data;
  } catch (error) {
    console.error("Error updating listing:", error);
    throw error;
  }
};

export {
  getListings,
  createListing,
  getMyListings,
  deleteListing,
  updateListing,
};
