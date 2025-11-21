import React, { useState, useEffect } from "react";
import { getListings } from "@/api/listingService";
import toast from "react-hot-toast";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getListings();
        setTransactions(data);
      } catch (error) {
        toast.error("Failed to load transactions",error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="bg-white rounded-lg shadow h-64"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Transaction & Bid History
      </h1>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">Item / Date</th>
              <th className="px-6 py-3 text-left">Seller (Generator)</th>
              <th className="px-6 py-3 text-left">Buyer (Collector)</th>
              <th className="px-6 py-3 text-left">Bidding Info</th>
              <th className="px-6 py-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="font-bold text-gray-900">
                    {item.wasteType}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-gray-500">{item.quantity} Kg</div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">
                    {item.user?.fullName || "Unknown"}
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.user?.email}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {item.collectedBy ? (
                    <>
                      <div className="font-medium text-blue-600">
                        {item.collectedBy.fullName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.collectedBy.email}
                      </div>
                    </>
                  ) : (
                    <span className="text-gray-400 italic">--</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-700">
                      Highest Bid: ₹{item.currentBid}
                    </span>
                    <span className="text-xs text-gray-500">
                      Total Bids: {item.bidCount}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      item.status === "Available"
                        ? "bg-green-100 text-green-800"
                        : item.status === "Claimed"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
