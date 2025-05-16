import React from "react";

const EventForm = ({ event, onChange, onSubmit, loading, error }) => {
  return (
    <form onSubmit={onSubmit} className="bg-white rounded-lg p-6 shadow-md">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray mb-1">
          Event Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={event.name}
          onChange={onChange}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={event.description}
          onChange={onChange}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          rows="5"
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="date" className="block text-gray mb-1">
            Date & Time
          </label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={event.date}
            onChange={onChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label htmlFor="venue" className="block text-gray mb-1">
            Venue
          </label>
          <input
            type="text"
            id="venue"
            name="venue"
            value={event.venue}
            onChange={onChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="price" className="block text-gray mb-1">
            Price ($)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={event.price}
            onChange={onChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div>
          <label htmlFor="availableSeats" className="block text-gray mb-1">
            Available Seats
          </label>
          <input
            type="number"
            id="availableSeats"
            name="availableSeats"
            value={event.availableSeats}
            onChange={onChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            min="0"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="category" className="block text-gray mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={event.category}
            onChange={onChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            <option value="concert">Concert</option>
            <option value="conference">Conference</option>
            <option value="sports">Sports</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="image" className="block text-gray mb-1">
            Image URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={event.image}
            onChange={onChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
      </div>
      {error && (
        <div className="bg-red-100 text-danger p-3 rounded mb-4">{error}</div>
      )}
      <button
        type="submit"
        className="w-full bg-primary text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default EventForm;
