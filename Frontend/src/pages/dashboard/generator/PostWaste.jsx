import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createListing } from "@/api/listingService";
import toast from "react-hot-toast"; // --- IMPORT TOAST ---

const PostWaste = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    wasteType: "",
    quantity: "",
    location: "",
    pickupDate: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.wasteType || !formData.quantity || !formData.location) {
      toast.error("Please fill out all required fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("wasteType", formData.wasteType);
      data.append("quantity", formData.quantity);
      data.append("location", formData.location);
      data.append("pickupDate", formData.pickupDate);
      data.append("description", formData.description);

      if (image) {
        data.append("image", image);
      }

      await createListing(data);

      // --- SUCCESS TOAST ---
      toast.success("Waste listing posted successfully!");

      setTimeout(() => {
        navigate("/dashboard/generator/my-listings");
      }, 1500); // Slight delay so user reads the toast
    } catch (err) {
      // --- ERROR TOAST ---
      toast.error(
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

      <div className="bg-white p-8 rounded-xl shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Waste Type */}
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

          {/* Quantity & Location */}
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

          {/* Date */}
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

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Image (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg"
            />
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
