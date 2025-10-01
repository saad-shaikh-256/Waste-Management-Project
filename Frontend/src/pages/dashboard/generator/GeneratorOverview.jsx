import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  getMyListings,
  deleteListing,
  updateListing,
} from "@/api/listingService";
import StatCard from "@/components/dashboard/StatCard";
import WasteListingCard from "@/components/dashboard/WasteListingCard";
import Modal from "@/components/common/Modal"; // Import the Modal
import EditListingForm from "@/components/dashboard/EditListingForm"; // Import the Form

// --- SVG Icon Components for StatCards ---
const ListIcon = () => (
  <svg
    className="w-6 h-6 text-green-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
    ></path>
  </svg>
);
const ActiveIcon = () => (
  <svg
    className="w-6 h-6 text-green-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    ></path>
  </svg>
);
const CompletedIcon = () => (
  <svg
    className="w-6 h-6 text-green-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);

const GeneratorOverview = () => {
  const { user } = useAuth();
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --- NEW: State for managing the edit modal ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

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

  // --- NEW: Handlers for the edit modal ---
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
      // Optionally set an error to be displayed inside the modal
    }
  };

  const stats = useMemo(() => {
    const total = myListings.length;
    const available = myListings.filter((l) => l.status === "Available").length;
    const completed = myListings.filter((l) => l.status === "Completed").length;
    return { total, available, completed };
  }, [myListings]);

  const recentListings = useMemo(() => {
    return [...myListings]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);
  }, [myListings]);

  if (loading) {
    return <div className="text-center p-10">Loading your overview...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">
        Welcome, {user?.name}!
      </h1>
      <p className="mt-2 text-gray-600">
        Here's a summary of your activity on EcoConnect.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
        <StatCard
          title="Total Listings Posted"
          value={stats.total}
          icon={<ListIcon />}
        />
        <StatCard
          title="Active Listings"
          value={stats.available}
          icon={<ActiveIcon />}
        />
        <StatCard
          title="Completed Pickups"
          value={stats.completed}
          icon={<CompletedIcon />}
        />
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Recent Listings</h2>
          <Link
            to="/dashboard/generator/my-listings"
            className="text-green-600 hover:underline font-semibold"
          >
            View All
          </Link>
        </div>

        {recentListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentListings.map((listing) => (
              <WasteListingCard
                key={listing._id}
                listing={listing}
                onDelete={handleDeleteListing}
                onEdit={() => handleOpenEditModal(listing)} // Pass the edit handler
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">
              You haven't posted any listings yet.
            </h2>
            <p className="mt-2 text-gray-500">Let's get started!</p>
            <Link
              to="/dashboard/generator/post-waste"
              className="mt-4 inline-block bg-green-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-green-700 transition"
            >
              Post Your First Waste Listing
            </Link>
          </div>
        )}
      </div>

      {/* --- NEW: Add the Modal component to the page --- */}
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

export default GeneratorOverview;
