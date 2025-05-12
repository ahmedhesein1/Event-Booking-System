import api from "./axios";

export const getEvents = async () => {
  try {
    const response = await api.get("/events");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await api.post("/events", eventData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateEvent = async (id, eventData) => {
  try {
    const response = await api.patch(`/events/${id}`, eventData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteEvent = async (id) => {
  try {
    await api.delete(`/events/${id}`);
  } catch (error) {
    throw error;
  }
};
