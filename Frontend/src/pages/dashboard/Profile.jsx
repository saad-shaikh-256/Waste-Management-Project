import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/api/axiosInstance";
import toast from "react-hot-toast";

const EditIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
    />
  </svg>
);

const CancelIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const SaveIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const Profile = () => {
  // 1. Destructure updateUser from useAuth
  const { user, updateUser } = useAuth();

  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI States
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load user data
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");

      // Format date for input type="date" (YYYY-MM-DD)
      if (user.dateOfBirth) {
        const date = new Date(user.dateOfBirth);
        const formatted = date.toISOString().split("T")[0];
        setDateOfBirth(formatted);
      } else {
        setDateOfBirth("");
      }
    }
  }, [user]);

  const handleCancel = () => {
    // Revert changes to current user data
    setName(user.name || "");
    setEmail(user.email || "");
    setPhone(user.phone || "");
    setAddress(user.address || "");

    if (user.dateOfBirth) {
      const date = new Date(user.dateOfBirth);
      setDateOfBirth(date.toISOString().split("T")[0]);
    } else {
      setDateOfBirth("");
    }

    setPassword("");
    setConfirmPassword("");
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (password && password !== confirmPassword) {
      toast.error("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axiosInstance.put("/users/profile", {
        fullName: name,
        email,
        phone,
        address,
        dateOfBirth,
        password: password || undefined,
      });

      // 2. Update Context Immediately
      updateUser(response.data);

      toast.success("Profile updated successfully!");
      setIsEditing(false);
      setIsSubmitting(false);
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
      setIsSubmitting(false);
    }
  };

  const inputClass = `w-full px-4 py-2.5 rounded-lg border transition-all duration-200 ${
    isEditing
      ? "border-gray-300 bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
      : "border-transparent bg-gray-100 text-gray-600 cursor-not-allowed"
  }`;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Account Settings</h1>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg shadow-sm hover:bg-gray-50 transition cursor-pointer"
          >
            <EditIcon /> Edit Profile
          </button>
        )}
      </div>

      <div className="bg-white p-8 rounded-xl shadow-md relative overflow-hidden">
        <div
          className={`absolute top-0 left-0 w-full h-1.5 ${
            isEditing ? "bg-green-500" : "bg-transparent"
          } transition-colors`}
        />

        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8 pb-8 border-b border-gray-100">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-4xl font-bold text-green-600 border-4 border-white shadow-sm uppercase">
            {user?.name?.charAt(0)}
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
            <p className="text-gray-500">{user?.email}</p>
            <div className="flex gap-2 justify-center md:justify-start mt-2">
              <span className="inline-block px-3 py-1 bg-gray-100 text-xs rounded-full text-gray-600 uppercase tracking-wide font-semibold">
                {user?.role}
              </span>
              {user?.status && (
                <span
                  className={`inline-block px-3 py-1 text-xs rounded-full uppercase tracking-wide font-semibold ${
                    user.status === "Verified"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {user.status}
                </span>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Extra Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
                disabled={!isEditing}
                placeholder="+91 00000 00000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className={inputClass}
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Address (Full width) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address / Location
            </label>
            <textarea
              rows="2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={inputClass}
              disabled={!isEditing}
              placeholder="Street, City, State, Zip"
            ></textarea>
          </div>

          {/* Password Section */}
          {isEditing && (
            <div className="pt-4 animate-fade-in">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Change Password
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass}
                    placeholder="Leave blank to keep current"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={inputClass}
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 mt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition cursor-pointer"
              >
                <CancelIcon /> Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-2.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition shadow-md disabled:opacity-70 cursor-pointer"
              >
                {isSubmitting ? (
                  "Saving..."
                ) : (
                  <>
                    <SaveIcon /> Save Changes
                  </>
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
