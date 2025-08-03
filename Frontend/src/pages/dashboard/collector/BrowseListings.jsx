import React, { useState, useMemo } from "react";

// Reuse your existing components and data!
import { mockWasteListings } from "@/data/mockData";
import WasteListingCard from "@/components/dashboard/WasteListingCard";

const BrowseListings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [wasteTypeFilter, setWasteTypeFilter] = useState("all");

  // useMemo will re-calculate the filtered list only when the dependencies change
  const filteredListings = useMemo(() => {
    return mockWasteListings.filter((listing) => {
      // Check if the search term matches location or provider name (case-insensitive)
      const matchesSearchTerm =
        listing.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.postedBy.toLowerCase().includes(searchTerm.toLowerCase());

      // Check if the waste type filter matches (or if it's set to 'all')
      const matchesWasteType =
        wasteTypeFilter === "all" ||
        listing.type.toLowerCase() === wasteTypeFilter;

      return matchesSearchTerm && matchesWasteType;
    });
  }, [searchTerm, wasteTypeFilter]); // Dependencies: re-run only when these change

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Browse Available Listings
      </h1>

      {/* Filter and Search Controls */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center">
        {/* Search by Location/Provider */}
        <div className="flex-grow w-full">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search by location or provider..."
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter by Waste Type */}
        <div className="w-full md:w-auto">
          <label htmlFor="waste-type-filter" className="sr-only">
            Filter by Type
          </label>
          <select
            id="waste-type-filter"
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

      {/* Listings Grid */}
      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <WasteListingCard key={listing.id} listing={listing} />
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
