import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { markListingAsCollected } from "@/api/listingService";
import toast from "react-hot-toast";

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

  const detailPageLink =
    loggedInUser?.role === "ngo"
      ? `/dashboard/ngo/listings/${_id}`
      : `/dashboard/collector/browse`;

  // --- CUSTOM DELETE CONFIRMATION TOAST ---
  const triggerDeleteConfirm = () => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3 min-w-[250px]">
          <p className="font-semibold text-gray-800">Delete this listing?</p>
          <p className="text-sm text-gray-500">This action cannot be undone.</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                onDelete(_id); // Trigger the actual delete function passed from parent
              }}
              className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition cursor-pointer"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      ),
      { duration: 5000, position: "top-center" }
    );
  };

  // --- CUSTOM PICKUP CONFIRMATION TOAST ---
  const triggerCollectConfirm = () => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3 min-w-[250px]">
          <p className="font-semibold text-gray-800">Confirm Pickup?</p>
          <p className="text-sm text-gray-500">
            Mark <b>{wasteType}</b> as Claimed?
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await markListingAsCollected(_id);
                  toast.success("Pickup Confirmed! Status updated.");
                  setTimeout(() => {
                    window.location.reload();
                  }, 1000);
                } catch (error) {
                  console.error(error);
                  toast.error(
                    error.response?.data?.message || "Failed to claim listing."
                  );
                }
              }}
              className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition cursor-pointer"
            >
              Confirm
            </button>
          </div>
        </div>
      ),
      { duration: 5000, position: "top-center" }
    );
  };

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
          <div className="mb-4 space-y-1">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Current Bid:</span>
              <span className="font-bold text-gray-800">
                ₹{currentBid ? currentBid.toLocaleString() : 0}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Total Bids:</span>
              <span className="font-bold text-gray-800">{bidCount || 0}</span>
            </div>
          </div>

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
              onClick={triggerDeleteConfirm} // Use custom toast trigger
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
        ) : loggedInUser && loggedInUser.role === "ngo" ? (
          <Link
            to={detailPageLink}
            className="text-sm font-medium text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition"
          >
            View & Bid
          </Link>
        ) : loggedInUser && loggedInUser.role === "waste-collector" ? (
          status === "Available" ? (
            <button
              onClick={triggerCollectConfirm} // Use custom toast trigger
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-sm transition shadow-md cursor-pointer"
            >
              Pickup
            </button>
          ) : (
            <span className="text-gray-500 font-medium text-sm italic">
              Already {status}
            </span>
          )
        ) : null}
      </div>
    </div>
  );
};

export default WasteListingCard;
