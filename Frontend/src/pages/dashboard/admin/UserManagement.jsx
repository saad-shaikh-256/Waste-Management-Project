import React from "react";
import { mockUsers } from "@/data/mockData";

// Helper function for status badge colors
const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "verified":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "suspended":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Helper function for role badge colors
const getRoleColor = (role) => {
  switch (role.toLowerCase()) {
    case "admin":
      return "bg-indigo-100 text-indigo-800";
    case "waste generator":
      return "bg-blue-100 text-blue-800";
    case "waste collector":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const UserManagement = () => {
  const handleAction = (action, userId) => {
    // In a real app, this would trigger an API call.
    // For now, we just log the action to the console.
    alert(`${action} user with ID: ${userId}`);
    console.log(`${action} user with ID: ${userId}`);
  };

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
            {mockUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {user.name}
                  </div>
                  <div className="text-sm text-gray-500">ID: {user.id}</div>
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
                    className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  {user.status === "Pending" && (
                    <button
                      onClick={() => handleAction("Verifying", user.id)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Verify
                    </button>
                  )}
                  <button
                    onClick={() => handleAction("Suspending", user.id)}
                    className="text-yellow-600 hover:text-yellow-900"
                  >
                    Suspend
                  </button>
                  <button
                    onClick={() => handleAction("Deleting", user.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
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
