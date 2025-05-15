import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookingList from "../components/bookings/BookingList";
import Loader from "../components/layout/Loader";
import api from "../utils/api";
import "./BookingsPage.css";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await api.get("/api/v1/bookings");
        setBookings(data.filter((booking) => booking.status === "confirmed"));
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = (bookingId) => {
    setBookings(bookings.filter((booking) => booking._id !== bookingId));
  };

  if (loading) return <Loader />;

  return (
    <div className="bookings-page">
      <div className="bookings-header">
        <h1>Your Bookings</h1>
        <Link to="/" className="btn btn-primary">
          Browse Events
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && bookings.length === 0 && (
        <div className="no-bookings">
          <h2>No active bookings</h2>
          <p>Explore events and book your tickets!</p>
          <Link to="/" className="btn btn-primary">
            Browse Events
          </Link>
        </div>
      )}

      <BookingList bookings={bookings} onCancel={handleCancelBooking} />
    </div>
  );
};

export default BookingsPage;
