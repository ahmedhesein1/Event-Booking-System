import React from "react";
import "./EventForm.css";

const EventForm = ({
  formData,
  handleChange,
  handleSubmit,
  loading,
  error,
  cancelAction,
}) => {
  return (
    <div className="event-form-container">
      <h1>{formData._id ? "Edit Event" : "Create New Event"}</h1>

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

        <div className="form-buttons">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading
              ? formData._id
                ? "Updating..."
                : "Creating..."
              : formData._id
              ? "Update Event"
              : "Create Event"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={cancelAction}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
