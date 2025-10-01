import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createListing } from "@/api/listingService"; // Import the real API function

const PostWaste = () => {
  const navigate = useNavigate();

  // Use a single state object for the form data
  const [formData, setFormData] = useState({
    wasteType: "",
    quantity: "",
    location: "",
    pickupDate: "",
    description: "",
  });

  const [image, setImage] = useState(null); // Separate state for the image file
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for the button

  // A single handler for all text-based inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsSubmitting(true);

    if (!formData.wasteType || !formData.quantity || !formData.location) {
      setError("Please fill out all required fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      // In a real app, you would handle image uploads separately to a service like Cloudinary
      // and get back a URL to save in the database. For now, we'll skip the image part.
      const dataToSubmit = { ...formData };

      await createListing(dataToSubmit);

      setSuccessMessage("Waste listing posted successfully! Redirecting...");

      // Redirect to the listings page after a short delay
      setTimeout(() => {
        navigate("/dashboard/generator/my-listings");
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to post listing. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Post a New Waste Listing
      </h1>

      {/* Success & Error Message Banners */}
      {successMessage && (
        <div
          className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md"
          role="alert"
        >
          <p>{successMessage}</p>
        </div>
      )}
      {error && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md"
          role="alert"
        >
          <p>{error}</p>
        </div>
      )}

      <div className="bg-white p-8 rounded-xl shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Waste Type Dropdown */}
          <div>
            <label
              htmlFor="wasteType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Waste Type*
            </label>
            <select
              id="wasteType"
              value={formData.wasteType}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
            >
              <option value="" disabled>
                Select a type...
              </option>
              <option value="Plastic">Plastic</option>
              <option value="Metal">Scrap Metal</option>
              <option value="E-Waste">E-Waste</option>
              <option value="Paper & Cardboard">Paper & Cardboard</option>
              <option value="Organic">Organic</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Quantity and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Estimated Quantity*
              </label>
              <input
                type="text"
                id="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
                placeholder="e.g., 50 kg, 10 bags"
              />
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Pickup Location*
              </label>
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
                placeholder="e.g., Mumbai, MH"
              />
            </div>
          </div>

          {/* Pickup Date */}
          <div>
            <label
              htmlFor="pickupDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Preferred Pickup Date
            </label>
            <input
              type="date"
              id="pickupDate"
              value={formData.pickupDate}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
              placeholder="Add any extra details..."
            ></textarea>
          </div>

          {/* Image Upload (UI only for now) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Image (Optional)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {/* ... SVG icon ... */}
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer ..."
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleImageChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  {image ? image.name : "PNG, JPG up to 10MB"}
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              {isSubmitting ? "Posting..." : "Post Listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostWaste;
