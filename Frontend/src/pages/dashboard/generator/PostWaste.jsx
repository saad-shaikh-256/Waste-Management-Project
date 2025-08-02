import React, { useState } from "react";

const PostWaste = () => {
  // State for each form field
  const [wasteType, setWasteType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the page from reloading
    setSuccessMessage(""); // Clear previous message

    // --- Data Validation (Simple Example) ---
    if (!wasteType || !quantity || !location) {
      alert("Please fill out all required fields.");
      return;
    }

    // --- Collate form data ---
    const formData = {
      wasteType,
      quantity,
      location,
      pickupDate,
      description,
      imageName: image ? image.name : "No image uploaded",
    };

    // --- Simulate sending data to the backend ---
    console.log("Submitting Form Data:", formData);

    // --- Show success message and reset form ---
    setSuccessMessage("Waste listing posted successfully!");
    setWasteType("");
    setQuantity("");
    setLocation("");
    // ... reset other fields

    // Hide the success message after 5 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Post a New Waste Listing
      </h1>

      {/* Success Message Banner */}
      {successMessage && (
        <div
          className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md"
          role="alert"
        >
          <p className="font-bold">Success</p>
          <p>{successMessage}</p>
        </div>
      )}

      <div className="bg-white p-8 rounded-xl shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Waste Type Dropdown */}
          <div>
            <label
              htmlFor="waste-type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Waste Type*
            </label>
            <select
              id="waste-type"
              value={wasteType}
              onChange={(e) => setWasteType(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
            >
              <option value="" disabled>
                Select a type...
              </option>
              <option value="plastic">Plastic</option>
              <option value="metal">Scrap Metal</option>
              <option value="e-waste">E-Waste</option>
              <option value="paper">Paper & Cardboard</option>
              <option value="organic">Organic</option>
              <option value="other">Other</option>
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
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
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
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
                placeholder="e.g., Mumbai, MH"
              />
            </div>
          </div>

          {/* Pickup Date */}
          <div>
            <label
              htmlFor="pickup-date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Preferred Pickup Date
            </label>
            <input
              type="date"
              id="pickup-date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
              placeholder="Add any extra details, like item condition or specific instructions."
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Image (Optional)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  {image ? image.name : "PNG, JPG, GIF up to 10MB"}
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
            >
              Post Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostWaste;
