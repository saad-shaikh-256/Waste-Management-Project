import React, { useState, useEffect } from "react";
import { getListings } from "@/api/listingService";
import WasteListingCard from "@/components/dashboard/WasteListingCard";
import SkeletonCard from "@/components/common/SkeletonCard"; // --- IMPORT SKELETON ---

const NgoAuctions = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getListings();
        const available = data.filter((l) => l.status === "Available");
        setListings(available);
      } catch (err) {
        console.error("Error fetching auctions", err);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  // --- SKELETON LOADING STATE ---
  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Browse Auctions
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <SkeletonCard key={n} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Browse Auctions</h1>
      {listings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <WasteListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">
            No available auctions.
          </h2>
          <p className="mt-2 text-gray-500">Please check back later.</p>
        </div>
      )}
    </div>
  );
};

export default NgoAuctions;
