import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import api from "../utils/api";
import { formatDate } from "../utils/formatDate";
import "./AdminPage.css";

const AdminPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await api.get("/api/v1/events");
        setEvents(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setDeleteLoading(true);
      try {
        await api.delete(`/api/v1/events/${eventId}`);
        setEvents(events.filter((event) => event._id !== eventId));
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete event");
      } finally {
        setDeleteLoading(false);
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <Link to="/admin/events/create" className="btn btn-primary">
          Create New Event
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && events.length === 0 && (
        <div className="no-events">
          <h2>No events found</h2>
          <p>Create your first event to get started!</p>
          <Link to="/admin/events/create" className="btn btn-primary">
            Create New Event
          </Link>
        </div>
      )}

      <div className="events-table-container">
        <table className="events-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Venue</th>
              <th>Price</th>
              <th>Available Seats</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id}>
                <td>{event.name}</td>
                <td>{formatDate(event.date)}</td>
                <td>{event.venue}</td>
                <td>${event.price.toFixed(2)}</td>
                <td>{event.availableSeats}</td>
                <td className="actions-cell">
                  <Link
                    to={`/events/${event._id}`}
                    className="btn btn-secondary btn-sm"
                  >
                    View
                  </Link>
                  <Link
                    to={`/admin/events/edit/${event._id}`}
                    className="btn btn-primary btn-sm"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteEvent(event._id)}
                    disabled={deleteLoading}
                  >
                    {deleteLoading ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
