import axiosInstance from "./axiosInstance";

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const updateUserStatus = async (id, status) => {
  // No try/catch needed here; let the component handle the error
  const response = await axiosInstance.put(`/users/${id}/status`, { status });
  return response.data;
};
