import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";
import { formatDate } from "../utils/formatDate";
import api from "../utils/api";
import "./EventDetails.css";

const EventDetails = () => {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await api.get(`/api/v1/events/${id}`);
        setEvent(data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch event details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleBookEvent = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setBookingLoading(true);
    setBookingError(null);

    try {
      await api.post(`/api/v1/bookings`, { eventId: id });
      setBookingSuccess(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (err) {
      setBookingError(err.response?.data?.message || "Failed to book event");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="event-details-error">
        <div className="alert alert-danger">{error}</div>
        <Link to="/" className="btn btn-primary">
          Back to Events
        </Link>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="event-details-error">
        <h2>Event not found</h2>
        <Link to="/" className="btn btn-primary">
          Back to Events
        </Link>
      </div>
    );
  }

  // Check if the event date has passed
  const eventPassed = new Date(event.date) < new Date();

  return (
    <div className="event-details">
      {bookingSuccess && (
        <div className="alert alert-success">
          Booking successful! Redirecting to your dashboard...
        </div>
      )}

      {bookingError && <div className="alert alert-danger">{bookingError}</div>}

      <div className="event-details-container">
        <div className="event-details-image">
          <img src={event.image} alt={event.name} />
          <span className="event-details-category">{event.category}</span>
        </div>

        <div className="event-details-content">
          <h1>{event.name}</h1>
          <div className="event-details-info">
            <p>
              <i className="fas fa-calendar"></i> {formatDate(event.date)}
            </p>
            <p>
              <i className="fas fa-map-marker-alt"></i> {event.venue}
            </p>
            <p>
              <i className="fas fa-ticket-alt"></i> {event.availableSeats} seats
              available
            </p>
            <p className="event-details-price">${event.price.toFixed(2)}</p>
          </div>

          <div className="event-details-description">
            <h3>Description</h3>
            <p>{event.description}</p>
          </div>

          <div className="event-details-actions">
            {isAuthenticated && user?.role === "admin" ? (
              <Link
                to={`/admin/events/edit/${event._id}`}
                className="btn btn-primary"
              >
                Edit Event
              </Link>
            ) : (
              <button
                className="btn btn-primary"
                onClick={handleBookEvent}
                disabled={
                  bookingLoading ||
                  bookingSuccess ||
                  event.availableSeats <= 0 ||
                  eventPassed
                }
              >
                {bookingLoading
                  ? "Processing..."
                  : eventPassed
                  ? "Event has passed"
                  : event.availableSeats <= 0
                  ? "Sold Out"
                  : "Book Now"}
              </button>
            )}
            <Link to="/" className="btn btn-secondary">
              Back to Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
