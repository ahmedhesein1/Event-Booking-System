import api from "./axios";

export const getBookings = async () => {
  try {
    const response = await api.get("/bookings");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createBooking = async (eventId) => {
  try {
    const response = await api.post(`/bookings/${eventId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cancelBooking = async (bookingId) => {
  try {
    await api.delete(`/bookings/${bookingId}`);
  } catch (error) {
    throw error;
  }
};
