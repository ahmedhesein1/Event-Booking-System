import React, { useState, useEffect } from "react";
import BookingList from "../components/bookings/BookingList";
import Loader from "../components/layout/Loader";
import api from "../utils/api";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
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
    fetchBookings();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="py-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-primary mb-4">Booking History</h1>
      {error && (
        <div className="bg-red-100 text-danger p-3 rounded mb-4">{error}</div>
      )}
      {bookings.length === 0 ? (
        <p className="text-gray">No booking history available.</p>
      ) : (
        <BookingList bookings={bookings} onCancel={() => {}} />
      )}
    </div>
  );
};

export default BookingHistory;
