import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getMyListings,
  deleteListing,
  updateListing,
} from "@/api/listingService";
import WasteListingCard from "@/components/dashboard/WasteListingCard";
import Modal from "@/components/common/Modal";
import EditListingForm from "@/components/dashboard/EditListingForm";

const MyListings = () => {
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State for managing the edit modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

  // Fetch listings when the component mounts
  useEffect(() => {
    const fetchMyListings = async () => {
      try {
        setLoading(true);
        const data = await getMyListings();
        setMyListings(data);
      } catch (error) {
        console.error("Failed to fetch user's listings:", error);
        setError("Could not load your listings.");
      } finally {
        setLoading(false);
      }
    };
    fetchMyListings();
  }, []);

  // Handler for deleting a listing
  const handleDeleteListing = async (id) => {
    try {
      await deleteListing(id);
      setMyListings((currentListings) =>
        currentListings.filter((listing) => listing._id !== id)
      );
    } catch (err) {
      setError("Failed to delete listing. Please try again.");
      console.error(err);
    }
  };

  // Handlers for the edit modal
  const handleOpenEditModal = (listing) => {
    setSelectedListing(listing);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedListing(null);
  };

  const handleSaveChanges = async (id, updatedData) => {
    try {
      const updatedListing = await updateListing(id, updatedData);
      setMyListings((currentListings) =>
        currentListings.map((l) => (l._id === id ? updatedListing : l))
      );
      handleCloseModal();
    } catch (err) {
      console.error("Failed to update listing:", err);
      // You could set an error state to be displayed inside the modal here
    }
  };

  if (loading) {
    return <div className="text-center p-10">Loading your listings...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Waste Listings</h1>
        <Link
          to="/dashboard/generator/post-waste"
          className="inline-flex items-center justify-center py-2.5 px-6 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 transition-all"
        >
          + Post New Listing
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      {myListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myListings.map((listing) => (
            <WasteListingCard
              key={listing._id}
              listing={listing}
              onDelete={handleDeleteListing}
              onEdit={() => handleOpenEditModal(listing)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">
            You haven't posted any listings yet.
          </h2>
          <p className="mt-2 text-gray-500">Ready to post your first one?</p>
          <Link
            to="/dashboard/generator/post-waste"
            className="mt-4 inline-block bg-green-100 text-green-700 font-semibold px-4 py-2 rounded-lg hover:bg-green-200 transition"
          >
            Post Waste Now
          </Link>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Edit Waste Listing"
      >
        <EditListingForm
          listing={selectedListing}
          onSave={handleSaveChanges}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default MyListings;
