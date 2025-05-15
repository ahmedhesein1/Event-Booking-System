import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BookingCard from '../components/BookingCard';
import Loader from '../components/Loader';
import api from '../utils/api';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await api.get('/api/v1/bookings');
        // Filter only confirmed bookings
        setBookings(data.filter(booking => booking.status === 'confirmed'));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = (bookingId) => {
    setBookings(bookings.filter(booking => booking._id !== bookingId));
  };

  if (loading) return <Loader />;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>My Bookings</h1>
        <Link to="/" className="btn btn-primary">
          Browse Events
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && bookings.length === 0 && (
        <div className="no-bookings">
          <h2>No active bookings found</h2>
          <p>Browse events and make a booking to see them here.</p>
          <Link to="/" className="btn btn-primary">
            Browse Events
          </Link>
        </div>
      )}

      <div className="bookings-list">
        {bookings.map((booking) => (
          <BookingCard
            key={booking._id}
            booking={booking}
            onCancel={handleCancelBooking}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;