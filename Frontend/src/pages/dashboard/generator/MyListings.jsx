import React from "react";
import { Link } from "react-router-dom";

// Import our mock data and the new card component
import { mockWasteListings } from "@/data/mockData";
import WasteListingCard from "@/components/dashboard/WasteListingCard";

const MyListings = () => {
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

      {/* Check if there are any listings to display */}
      {mockWasteListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Map over the mock data and render a card for each item */}
          {mockWasteListings.map((listing) => (
            <WasteListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        // Display a message if there are no listings
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">
            No listings found.
          </h2>
          <p className="mt-2 text-gray-500">Ready to post your first one?</p>
        </div>
      )}
    </div>
  );
};

export default MyListings;
