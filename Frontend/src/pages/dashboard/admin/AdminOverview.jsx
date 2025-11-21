import React, { useState, useEffect, useMemo } from "react";
import { getListings } from "@/api/listingService";
import { getAllUsers } from "@/api/userService";
import StatCard from "@/components/dashboard/StatCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminOverview = () => {
  const [listings, setListings] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [listingsData, usersData] = await Promise.all([
          getListings(),
          getAllUsers(),
        ]);
        setListings(listingsData);
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching admin data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- FIX: Count BOTH 'Completed' and 'Claimed' ---
  const completedListings = listings.filter(
    (l) => l.status === "Completed" || l.status === "Claimed"
  ).length;

  const chartData = useMemo(() => {
    const types = {};
    listings.forEach((listing) => {
      const type = listing.wasteType || listing.type || "Other";
      types[type] = (types[type] || 0) + 1;
    });
    return Object.keys(types).map((type) => ({
      name: type,
      listings: types[type],
    }));
  }, [listings]);

  if (loading) return <div className="p-6">Loading Admin Dashboard...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={users.length}
          icon={
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
          }
        />
        <StatCard
          title="Total Listings"
          value={listings.length}
          icon={
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              ></path>
            </svg>
          }
        />
        <StatCard
          title="Transactions (Claimed)" // Updated Title
          value={completedListings}
          icon={
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          }
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Listings by Waste Type
        </h2>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="listings" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
