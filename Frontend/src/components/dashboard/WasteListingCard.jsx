import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

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
  const { user } = useAuth();
  const { id, type, quantity, location, status, date, postedBy, currentBid, bidCount } = listing;

  // Determine the correct link based on the user's role.
  // This makes the component more reusable for the future.
  const detailPageLink = user?.role === 'ngo' 
    ? `/dashboard/ngo/listings/${id}` 
    : `/dashboard/collector/browse`; // Fallback for collector for now

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start">
          <div className="tracking-wide text-sm text-green-600 font-bold">{type}</div>
          <div className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusColor(status)}`}>
            {status}
          </div>
        </div>

        <p className="block mt-2 text-xl leading-tight font-semibold text-gray-900">{quantity}</p>
        <p className="mt-1 text-gray-500">{location}</p>

        <div className="mt-4 border-t border-gray-100 pt-4">
          {currentBid !== undefined && bidCount !== undefined && (
            <div className="mb-4 space-y-1">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Current Bid:</span>
                <span className="font-bold text-gray-800">₹{currentBid.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Total Bids:</span>
                <span className="font-bold text-gray-800">{bidCount}</span>
              </div>
            </div>
          )}
          
          <p className="text-sm text-gray-600">Posted on: {date}</p>
          <p className="text-sm text-gray-600">By: {postedBy}</p>
        </div>
      </div>

      <div className="p-4 bg-gray-50 flex justify-end gap-3 items-center">
        {user && user.role === 'waste-generator' ? (
          <>
            <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Delete</button>
            <button className="text-sm font-medium text-white bg-gray-800 hover:bg-black px-4 py-2 rounded-lg transition">Edit</button>
          </>
        ) : user && (user.role === 'waste-collector' || user.role === 'ngo') ? (
          <Link 
            to={detailPageLink} 
            className="text-sm font-medium text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition"
          >
            {user.role === 'ngo' ? 'View & Bid' : 'View Details'}
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default WasteListingCard;