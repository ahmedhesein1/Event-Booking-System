import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [price, setPrice] = useState("");
  const [availableSeats, setAvailableSeats] = useState("");
  const [category, setCategory] = useState("concert");
  const [image, setImage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await api.get(`/api/v1/events/${id}`);
        setName(data.name || "");
        setDescription(data.description || "");
        setDate(
          data.date ? new Date(data.date).toISOString().slice(0, 16) : ""
        );
        setVenue(data.venue || "");
        setPrice(data.price !== undefined ? data.price.toString() : "");
        setAvailableSeats(
          data.availableSeats !== undefined
            ? data.availableSeats.toString()
            : ""
        );
        setCategory(data.category || "concert");
        setImage(data.image || "");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch event");
      }
    };
    fetchEvent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFields = {
      ...(name.trim() && { name }),
      ...(description.trim() && { description }),
      ...(date && { date: new Date(date) }),
      ...(venue.trim() && { venue }),
      ...(price && { price: parseFloat(price) }),
      ...(availableSeats && { availableSeats: parseInt(availableSeats) }),
      ...(category && { category }),
      ...(image.trim() && { image }),
    };

    if (Object.keys(updatedFields).length === 0) {
      setError("No changes made to update");
      return;
    }

    try {
      await api.patch(`/api/v1/events/${id}`, updatedFields);
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update event");
    }
  };

  if (error)
    return (
      <div className="bg-red-100 text-danger p-3 rounded max-w-7xl mx-auto">
        {error}
      </div>
    );

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-primary mb-4">Edit Event</h1>
      {error && (
        <div className="bg-red-100 text-danger p-3 rounded mb-4">{error}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray mb-1">
            Date
          </label>
          <input
            type="datetime-local"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="venue" className="block text-gray mb-1">
            Venue
          </label>
          <input
            type="text"
            id="venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray mb-1">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            step="0.01"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="availableSeats" className="block text-gray mb-1">
            Available Seats
          </label>
          <input
            type="number"
            id="availableSeats"
            value={availableSeats}
            onChange={(e) => setAvailableSeats(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray mb-1">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="concert">Concert</option>
            <option value="conference">Conference</option>
            <option value="sports">Sports</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray mb-1">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white p-2 rounded hover:bg-blue-700"
        >
          Update Event
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
