import React, { useState, useEffect } from "react";
import { getAllUsers, updateUserStatus } from "@/api/userService";
import toast from "react-hot-toast";

const getRoleColor = (role) => {
  switch (role?.toLowerCase()) {
    case "admin":
      return "bg-indigo-100 text-indigo-800";
    case "waste-generator":
      return "bg-blue-100 text-blue-800";
    case "waste-collector":
      return "bg-purple-100 text-purple-800";
    case "ngo":
      return "bg-teal-100 text-teal-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        toast.error("Failed to load users.", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleStatusChange = async (userId, newStatus) => {
    const originalUsers = [...users];
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, status: newStatus } : user
      )
    );

    try {
      await updateUserStatus(userId, newStatus);
      toast.success(`User status updated to ${newStatus}`);
    } catch (err) {
      toast.error("Failed to update user status", err);
      setUsers(originalUsers);
    }
  };

  // --- SKELETON LOADING STATE ---
  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          User Management
        </h1>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 space-y-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="flex gap-6 animate-pulse">
                <div className="h-10 bg-gray-100 rounded w-1/3"></div>
                <div className="h-10 bg-gray-100 rounded w-1/3"></div>
                <div className="h-10 bg-gray-100 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">User Management</h1>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {user.fullName || user.name}
                  </div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === "Verified"
                        ? "bg-green-100 text-green-800"
                        : user.status === "Suspended"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {user.status || "Pending"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  {user.status !== "Verified" && (
                    <button
                      onClick={() => handleStatusChange(user._id, "Verified")}
                      className="text-green-600 hover:text-green-900 hover:underline cursor-pointer"
                    >
                      Verify
                    </button>
                  )}
                  {user.status !== "Suspended" && (
                    <button
                      onClick={() => handleStatusChange(user._id, "Suspended")}
                      className="text-red-600 hover:text-red-900 hover:underline cursor-pointer"
                    >
                      Suspend
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
