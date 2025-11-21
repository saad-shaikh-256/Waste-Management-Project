import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getListingById, placeBid } from "@/api/listingService";
import toast from "react-hot-toast";

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
  const { id } = useParams();
  const [bidAmount, setBidAmount] = useState("");
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getListingById(id);
        setListing(data);
      } catch (err) {
        toast.error("Failed to load listing details.", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    const currentHighest = listing.currentBid || 0;

    if (!bidAmount || isNaN(bidAmount) || Number(bidAmount) <= currentHighest) {
      toast.error(
        `Bid must be higher than ₹${currentHighest.toLocaleString()}.`
      );
      return;
    }

    try {
      await placeBid(id, Number(bidAmount));

      toast.success(`Bid of ₹${Number(bidAmount).toLocaleString()} placed!`);

      setListing((prev) => ({
        ...prev,
        currentBid: Number(bidAmount),
        bidCount: (prev.bidCount || 0) + 1,
      }));
      setBidAmount("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to place bid.");
    }
  };

  // --- SKELETON LOADING STATE ---
  if (loading) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-lg animate-pulse mt-10">
        <div className="h-10 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="h-32 bg-gray-200 rounded w-full"></div>
          </div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!listing)
    return <div className="p-10 text-center">Listing not found.</div>;

  return (
    <div>
      <Link
        to="/dashboard/ngo/auctions"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6"
      >
        <BackArrowIcon /> <span>Back to Auctions</span>
      </Link>

      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800">
          {listing.wasteType} - {listing.quantity}
        </h1>
        <p className="mt-2 text-gray-600">{listing.location}</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Listing Details
            </h2>
            <div className="border-t pt-4 space-y-2 text-gray-700">
              <p>
                <strong>Status:</strong>{" "}
                <span className="text-green-600">{listing.status}</span>
              </p>
              <p>
                <strong>Posted On:</strong>{" "}
                {new Date(listing.createdAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {listing.description || "No description provided."}
              </p>
              {listing.image && (
                <img
                  // Note: Assuming local static serve or cloudinary
                  src={`http://localhost:5001/${listing.image}`}
                  alt="Waste"
                  className="mt-4 rounded-lg h-48 object-cover w-full"
                />
              )}
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border">
            <h2 className="text-xl font-semibold text-gray-700">
              Bidding Information
            </h2>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-lg">
                <span>Current Bid:</span>
                <span className="font-bold text-green-600">
                  ₹
                  {listing.currentBid ? listing.currentBid.toLocaleString() : 0}
                </span>
              </div>
              <div className="flex justify-between text-md text-gray-600">
                <span>Total Bids:</span>
                <span>{listing.bidCount || 0}</span>
              </div>
            </div>

            <form onSubmit={handleBidSubmit} className="mt-6 space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Your Bid Amount (INR)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  ₹
                </span>
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="w-full pl-7 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
                  placeholder="Enter amount"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition cursor-pointer"
              >
                Place Your Bid
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailPage;
