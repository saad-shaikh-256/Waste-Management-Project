import React from "react";
import { mockWasteListings } from "@/data/mockData";
import WasteListingCard from "@/components/dashboard/WasteListingCard";

const NgoAuctions = () => {
  // Filter for listings that are available for bidding
  const availableListings = mockWasteListings.filter(
    (listing) => listing.status === "Available"
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Browse Auctions</h1>

      {availableListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableListings.map((listing) => (
            <WasteListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">
            No available auctions at the moment.
          </h2>
          <p className="mt-2 text-gray-500">Please check back later.</p>
        </div>
      )}
    </div>
  );
};

export default NgoAuctions;
