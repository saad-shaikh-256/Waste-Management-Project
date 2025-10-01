import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "available":
      return "bg-green-100 text-green-800";
    case "claimed":
      return "bg-yellow-100 text-yellow-800";
    case "completed":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const WasteListingCard = ({
  listing,
  onDelete = () => {},
  onEdit = () => {},
}) => {
  const { user: loggedInUser } = useAuth();
  const {
    _id,
    wasteType,
    quantity,
    location,
    status,
    createdAt,
    user,
    currentBid,
    bidCount,
  } = listing;

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      onDelete(_id);
    }
  };

  const detailPageLink =
    loggedInUser?.role === "ngo"
      ? `/dashboard/ngo/listings/${_id}`
      : `/dashboard/collector/browse`;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start">
          <div className="tracking-wide text-sm text-green-600 font-bold">
            {wasteType}
          </div>
          <div
            className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusColor(
              status
            )}`}
          >
            {status}
          </div>
        </div>
        <p className="block mt-2 text-xl leading-tight font-semibold text-gray-900">
          {quantity}
        </p>
        <p className="mt-1 text-gray-500">{location}</p>
        <div className="mt-4 border-t border-gray-100 pt-4">
          {currentBid !== undefined && bidCount !== undefined && (
            <div className="mb-4 space-y-1">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Current Bid:</span>
                <span className="font-bold text-gray-800">
                  ₹{currentBid.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Total Bids:</span>
                <span className="font-bold text-gray-800">{bidCount}</span>
              </div>
            </div>
          )}
          <p className="text-sm text-gray-600">
            Posted on: {formatDate(createdAt)}
          </p>
          <p className="text-sm text-gray-600">
            By: {user?.fullName || "Unknown"}
          </p>
        </div>
      </div>
      <div className="p-4 bg-gray-50 flex justify-end gap-3 items-center">
        {loggedInUser && loggedInUser.role === "waste-generator" ? (
          <>
            <button
              onClick={handleDelete}
              className="text-sm font-medium text-red-600 hover:text-red-900 transition cursor-pointer"
            >
              Delete
            </button>
            <button
              onClick={onEdit}
              className="text-sm font-medium text-white bg-gray-800 hover:bg-black px-4 py-2 rounded-lg transition cursor-pointer"
            >
              Edit
            </button>
          </>
        ) : loggedInUser &&
          (loggedInUser.role === "waste-collector" ||
            loggedInUser.role === "ngo") ? (
          <Link
            to={detailPageLink}
            className="text-sm font-medium text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition"
          >
            {loggedInUser.role === "ngo" ? "View & Bid" : "View Details"}
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default WasteListingCard;
