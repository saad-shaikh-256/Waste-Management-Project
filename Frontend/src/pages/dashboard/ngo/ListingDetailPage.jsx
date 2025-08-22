import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { mockWasteListings } from "@/data/mockData";

const BackArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 19l-7-7m0 0l7-7m-7 7h18"
    />
  </svg>
);

const ListingDetailPage = () => {
  const { id } = useParams(); // Get the listing ID from the URL
  const [bidAmount, setBidAmount] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [listing, setListing] = useState(null);

  // Find the specific listing from our mock data when the component mounts
  useEffect(() => {
    const foundListing = mockWasteListings.find((l) => l.id === parseInt(id));
    setListing(foundListing);
  }, [id]);

  const handleBidSubmit = (e) => {
    e.preventDefault();
    if (
      !bidAmount ||
      isNaN(bidAmount) ||
      Number(bidAmount) <= listing.currentBid
    ) {
      setMessage({
        type: "error",
        text: `Your bid must be a number higher than the current bid of ₹${listing.currentBid.toLocaleString()}.`,
      });
      return;
    }
    // Simulate successful bid
    console.log(`Placing bid of ${bidAmount} on listing ${id}`);
    setMessage({
      type: "success",
      text: `Your bid of ₹${Number(
        bidAmount
      ).toLocaleString()} has been placed successfully!`,
    });
    setBidAmount("");
  };

  // Show a loading or not found state until the listing is loaded
  if (!listing) {
    return (
      <div className="text-center p-10">
        <h1 className="text-xl text-gray-600">
          Loading listing details or listing not found...
        </h1>
        <Link
          to="/dashboard/ngo/overview"
          className="text-green-600 hover:underline mt-4 inline-block"
        >
          Return to Auctions
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/dashboard/ngo/auctions"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 font-semibold transition-colors mb-6"
      >
        <BackArrowIcon />
        <span>Back to Auctions</span>
      </Link>

      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800">
          {listing.type} - {listing.quantity}
        </h1>
        <p className="mt-2 text-gray-600">
          from {listing.postedBy} in {listing.location}
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side - Details */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Listing Details
            </h2>
            <div className="border-t pt-4 space-y-2 text-gray-700">
              <p>
                <strong>Status:</strong>{" "}
                <span className="font-medium text-green-600">
                  {listing.status}
                </span>
              </p>
              <p>
                <strong>Posted On:</strong> {listing.date}
              </p>
              <p>
                <strong>Description:</strong> This section would contain a more
                detailed description of the waste material, its condition, and
                any specific pickup instructions provided by the generator.
              </p>
            </div>
          </div>

          {/* Right Side - Bidding */}
          <div className="bg-gray-50 p-6 rounded-lg border">
            <h2 className="text-xl font-semibold text-gray-700">
              Bidding Information
            </h2>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-lg">
                <span>Current Bid:</span>
                <span className="font-bold text-green-600">
                  ₹{listing.currentBid.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-md text-gray-600">
                <span>Total Bids:</span>
                <span>{listing.bidCount}</span>
              </div>
            </div>

            <form onSubmit={handleBidSubmit} className="mt-6 space-y-4">
              <label
                htmlFor="bidAmount"
                className="block text-sm font-medium text-gray-700"
              >
                Your Bid Amount (INR)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  ₹
                </span>
                <input
                  type="number"
                  id="bidAmount"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="w-full pl-7 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
                  placeholder="Enter amount"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition"
              >
                Place Your Bid
              </button>
            </form>
            {message.text && (
              <p
                className={`mt-4 text-sm text-center font-medium ${
                  message.type === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {message.text}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailPage;
