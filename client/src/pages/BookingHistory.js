import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookingCard from "../components/BookingCard";
import Loader from "../components/Loader";
import api from "../utils/api";
import "./BookingHistory.css";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const { data } = await api.get("/api/v1/bookings/history");
        setBookings(data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch booking history"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookingHistory();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="booking-history">
      <div className="booking-history-header">
        <h1>Booking History</h1>
        <Link to="/dashboard" className="btn btn-primary">
          Active Bookings
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && bookings.length === 0 && (
        <div className="no-bookings">
          <h2>No booking history found</h2>
          <p>Your past and cancelled bookings will appear here.</p>
          <Link to="/" className="btn btn-primary">
            Browse Events
          </Link>
        </div>
      )}

      <div className="bookings-list">
        {bookings.map((booking) => (
          <BookingCard key={booking._id} booking={booking} isHistory={true} />
        ))}
      </div>
    </div>
  );
};

export default BookingHistory;
