// This file contains sample data to simulate a backend API.
export const mockWasteListings = [
  {
    id: 1,
    type: "Plastic",
    quantity: "50 kg",
    location: "Mumbai, MH",
    status: "Available",
    postedBy: "GreenTech Solutions",
    date: "2023-10-27",
    currentBid: 1500,
    bidCount: 5,
  },
  {
    id: 2,
    type: "E-Waste",
    quantity: "12 units (Monitors, CPUs)",
    location: "Pune, MH",
    status: "Claimed",
    postedBy: "City Hospital",
    date: "2023-10-26",
    currentBid: 3200,
    bidCount: 8,
  },
  {
    id: 3,
    type: "Scrap Metal",
    quantity: "Approx. 200 kg",
    location: "Navi Mumbai, MH",
    status: "Available",
    postedBy: "AutoWorks Garage",
    date: "2023-10-25",
    currentBid: 8500,
    bidCount: 12,
  },
  {
    id: 4,
    type: "Paper & Cardboard",
    quantity: "15 Large Boxes",
    location: "Thane, MH",
    status: "Completed",
    postedBy: "Bookstore Warehouse",
    date: "2023-10-22",
    currentBid: 800,
    bidCount: 3,
  },
];

export const mockUsers = [
  {
    id: 101,
    name: "GreenTech Solutions",
    role: "Waste Generator",
    status: "Verified",
  },
  {
    id: 102,
    name: "City Hospital",
    role: "Waste Generator",
    status: "Verified",
  },
  {
    id: 103,
    name: "Mumbai Waste Co.",
    role: "Waste Collector",
    status: "Pending",
  },
  { id: 104, name: "Clean Earth Foundation", role: "NGO", status: "Verified" },
];
