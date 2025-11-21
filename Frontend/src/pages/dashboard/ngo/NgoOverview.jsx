import React, { useState, useEffect } from "react";
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

const NgoOverview = () => {
  const [stats, setStats] = useState({ members: 0, listings: 0, weight: 0 });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [listingsData, usersData] = await Promise.all([
          getListings(),
          getAllUsers(),
        ]);

        // 1. Calculate Members (excluding admins)
        const memberCount = usersData.filter((u) => u.role !== "admin").length;

        // 2. Calculate Estimated Weight
        // Logic: Extract the first number found in the "quantity" string (e.g. "50 kg" -> 50)
        let totalWeight = 0;
        listingsData.forEach((l) => {
          const match = l.quantity.match(/(\d+)/);
          if (match) {
            totalWeight += parseInt(match[0], 10);
          }
        });

        // 3. Prepare Chart Data
        const types = {};
        listingsData.forEach((l) => {
          const type = l.wasteType || "Other";
          types[type] = (types[type] || 0) + 1;
        });
        const graphData = Object.keys(types).map((type) => ({
          name: type,
          listings: types[type],
        }));

        setStats({
          members: memberCount,
          listings: listingsData.length,
          weight: totalWeight,
        });
        setChartData(graphData);
      } catch (error) {
        console.error("Error fetching NGO data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-6">Loading Impact Data...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Community Impact Overview
      </h1>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Community Members"
          value={stats.members}
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
          title="Total Listings Created"
          value={stats.listings}
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              ></path>
            </svg>
          }
        />
        <StatCard
          title="Waste Diverted (Est. kg)"
          value={`${stats.weight} kg`}
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

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Waste Types in the Community
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
              <Bar
                dataKey="listings"
                fill="#10B981"
                name="Number of Listings"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default NgoOverview;
