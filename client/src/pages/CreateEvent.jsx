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
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.post("/api/v1/events", {
        ...formData,
        price: parseFloat(formData.price),
        availableSeats: parseInt(formData.availableSeats),
      });
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
