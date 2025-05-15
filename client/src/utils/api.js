import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL,
  withCredentials: true, // Important for cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
