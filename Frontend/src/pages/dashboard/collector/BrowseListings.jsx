import React, { useState, useEffect, useMemo } from "react";
import { getListings } from "@/api/listingService";
import WasteListingCard from "@/components/dashboard/WasteListingCard";
import SkeletonCard from "@/components/common/SkeletonCard"; // Import

const BrowseListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [wasteTypeFilter, setWasteTypeFilter] = useState("all");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getListings();
        setListings(data);
      } catch (error) {
        console.error("Failed to fetch listings", error);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const matchesSearchTerm =
        listing.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (listing.user &&
          listing.user.fullName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()));
      const matchesWasteType =
        wasteTypeFilter === "all" ||
        listing.wasteType.toLowerCase() === wasteTypeFilter;
      return matchesSearchTerm && matchesWasteType;
    });
  }, [listings, searchTerm, wasteTypeFilter]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Browse Available Listings
      </h1>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-grow w-full">
          <input
            type="text"
            placeholder="Search by location or provider..."
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-auto">
          <select
            className="w-full md:w-auto px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
            value={wasteTypeFilter}
            onChange={(e) => setWasteTypeFilter(e.target.value)}
          >
            <option value="all">All Waste Types</option>
            <option value="plastic">Plastic</option>
            <option value="metal">Scrap Metal</option>
            <option value="e-waste">E-Waste</option>
            <option value="paper & cardboard">Paper & Cardboard</option>
          </select>
        </div>
      </div>

      {/* SKELETON LOGIC */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <SkeletonCard key={n} />
          ))}
        </div>
      ) : filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <WasteListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">
            No listings match your criteria.
          </h2>
          <p className="mt-2 text-gray-500">
            Try adjusting your search or filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default BrowseListings;
