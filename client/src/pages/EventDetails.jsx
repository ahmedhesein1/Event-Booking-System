import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/layout/Loader";
import api from "../utils/api";
import { formatDate } from "../utils/formatDate";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seats, setSeats] = useState(1); // Initialize with 1

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await api.get(`/api/v1/events/${id}`);
        setEvent(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch event");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleSeatsChange = (e) => {
    const value = parseInt(e.target.value, 10); // Parse as base-10 integer
    if (isNaN(value) || value < 1) {
      setSeats(1); // Default to 1 if invalid
    } else if (event && value > event.availableSeats) {
      setSeats(event.availableSeats); // Cap at available seats
    } else {
      setSeats(value); // Set the new value
    }
  };

  const handleBook = async (e) => {
    e.preventDefault();
    if (!event || seats > event.availableSeats) {
      setError("Not enough seats available or invalid seat selection");
      return;
    }
    try {
      await api.post(`/api/v1/bookings/${id}`, { seats });
      navigate("/congratulations");
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
    }
  };

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="bg-red-100 text-danger p-3 rounded max-w-7xl mx-auto">
        {error}
      </div>
    );
  if (!event) return <p className="text-center text-gray">Event not found.</p>;

  return (
    <div className="py-8 max-w-7xl mx-auto text-center">
      <img
        src={event.image}
        alt={event.name}
        onError={(e) =>
          (e.target.src = "https://placehold.co/600x400?text=Image+Not+Found")
        }
        className="w-full max-w-md mx-auto h-auto rounded-lg mb-4"
      />
      <h1 className="text-2xl font-bold text-primary mb-2">{event.name}</h1>
      <p className="text-gray mb-2">{event.description}</p>
      <p className="text-gray mb-1">Date: {formatDate(event.date)}</p>
      <p className="text-gray mb-1">Venue: {event.venue}</p>
      <p className="text-gray mb-1">
        Price: ${event.price.toFixed(2)} per seat
      </p>
      <p className="text-gray mb-4">Available Seats: {event.availableSeats}</p>
      <form onSubmit={handleBook} className="max-w-xs mx-auto">
        <div className="mb-4">
          <label htmlFor="seats" className="block text-gray mb-1">
            Number of Seats
          </label>
          <input
            type="number"
            id="seats"
            value={seats}
            onChange={handleSeatsChange}
            min="1"
            max={event ? event.availableSeats : 1} // Dynamic max based on event
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white p-2 rounded hover:bg-blue-700"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default EventDetails;
