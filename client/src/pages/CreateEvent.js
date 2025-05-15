import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "./EventForms.css";

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
    <div className="create-event">
      <h1>Create New Event</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-group">
          <label htmlFor="name">Event Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
            rows="5"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Date & Time</label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Price ($)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="form-control"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="availableSeats">Available Seats</label>
            <input
              type="number"
              id="availableSeats"
              name="availableSeats"
              value={formData.availableSeats}
              onChange={handleChange}
              className="form-control"
              min="0"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="concert">Concert</option>
              <option value="conference">Conference</option>
              <option value="sports">Sports</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="image">Image URL</label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Creating..." : "Create Event"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/admin")}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
