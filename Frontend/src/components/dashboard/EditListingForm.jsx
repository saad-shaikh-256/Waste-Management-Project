import React, { useState, useEffect } from "react";

const EditListingForm = ({ listing, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    wasteType: "",
    quantity: "",
    location: "",
    description: "",
  });

  // When the 'listing' prop changes, pre-fill the form with its data
  useEffect(() => {
    if (listing) {
      setFormData({
        wasteType: listing.wasteType || "",
        quantity: listing.quantity || "",
        location: listing.location || "",
        description: listing.description || "",
      });
    }
  }, [listing]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(listing._id, formData); // Pass the ID and updated data to the parent
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="wasteType"
          className="block text-sm font-medium text-gray-700"
        >
          Waste Type
        </label>
        <select
          id="wasteType"
          value={formData.wasteType}
          onChange={handleChange}
          className="mt-1 w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"
        >
          <option value="Plastic">Plastic</option>
          <option value="Scrap Metal">Scrap Metal</option>
          <option value="E-Waste">E-Waste</option>
          {/* ... other options ... */}
        </select>
      </div>
      <div>
        <label
          htmlFor="quantity"
          className="block text-sm font-medium text-gray-700"
        >
          Quantity
        </label>
        <input
          type="text"
          id="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="mt-1 w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700"
        >
          Location
        </label>
        <input
          type="text"
          id="location"
          value={formData.location}
          onChange={handleChange}
          className="mt-1 w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"
        ></textarea>
      </div>
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditListingForm;
