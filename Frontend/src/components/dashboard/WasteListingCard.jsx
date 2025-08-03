import React from "react";

// A helper function to determine the color of the status badge
const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
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

const WasteListingCard = ({ listing }) => {
  // Destructure the props for easier access
  const { type, quantity, location, status, date, postedBy } = listing;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="tracking-wide text-sm text-green-600 font-bold">
            {type}
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
          <p className="text-sm text-gray-600">Posted on: {date}</p>
          <p className="text-sm text-gray-600">By: {postedBy}</p>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">
            Delete
          </button>
          <button className="text-sm font-medium text-white bg-gray-800 hover:bg-black px-4 py-2 rounded-lg transition">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default WasteListingCard;
