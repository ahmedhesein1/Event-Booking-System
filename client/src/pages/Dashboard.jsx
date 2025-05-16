import React, { useState, useEffect } from "react";
import BookingList from "../components/bookings/BookingList";
import Loader from "../components/layout/Loader";
import api from "../utils/api";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await api.get("/api/v1/bookings"); // Backend handles confirmed status
        setBookings(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    try {
      await api.patch(`/api/v1/bookings/${bookingId}`);
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to cancel booking");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="py-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-primary mb-4">Your Bookings</h1>
      {error && (
        <div className="bg-red-100 text-danger p-3 rounded mb-4">{error}</div>
      )}
      {bookings.length === 0 ? (
        <div className="text-center">
          <h2 className="text-xl text-gray">No active bookings</h2>
          <p className="text-gray">Explore events and book your tickets!</p>
        </div>
      ) : (
        <BookingList bookings={bookings} onCancel={handleCancelBooking} />
      )}
    </div>
  );
};

export default Dashboard;
