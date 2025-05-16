import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import EventForm from "../components/events/EventForm";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    venue: "",
    price: "",
    availableSeats: "",
    category: "concert",
    imageFile: null, // For file upload
    imageUrl: "", // For URL input
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("venue", formData.venue);
    formDataToSend.append("price", parseFloat(formData.price));
    formDataToSend.append("availableSeats", parseInt(formData.availableSeats));
    formDataToSend.append("category", formData.category);

    // Prioritize uploaded file over URL
    if (formData.imageFile) {
      formDataToSend.append("image", formData.imageFile);
    } else if (formData.imageUrl) {
      formDataToSend.append("imageUrl", formData.imageUrl); // Send URL to backend
    }

    try {
      await api.post("/api/v1/events", formDataToSend);
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-primary mb-4">Create New Event</h1>
      <EventForm
        event={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default CreateEvent;
