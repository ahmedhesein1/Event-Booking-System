import api from "./axios";

export const promoteUser = async (userId) => {
  try {
    const response = await api.patch(`/admin/promote/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
