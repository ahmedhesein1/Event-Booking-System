import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";
import { formatDate } from "../utils/formatDate";
import Loader from "../components/layout/Loader";

const AdminDashboard = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [bestEvents, setBestEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteUserLoading, setDeleteUserLoading] = useState(false);
  const [deleteEventLoading, setDeleteEventLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [usersResponse, eventsResponse] = await Promise.all([
          api.get("/api/v1/admin/users-with-bookings"),
          api.get("/api/v1/admin/events-with-bookings"),
        ]);
        setUsers(usersResponse.data || []);
        setEvents(eventsResponse.data.allEvents || []);
        setBestEvents(eventsResponse.data.bestEvents || []);
      } catch (err) {
        if (err.response?.status === 404) {
          setError(
            "Admin endpoints not found. Please check the backend routes."
          );
        } else if (err.response?.status === 401) {
          setError("Unauthorized. Please log in as an admin.");
        } else if (err.response?.status === 403) {
          setError("Access denied. Admins only.");
        } else {
          setError(err.response?.data?.message || "Failed to fetch admin data");
        }
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && user && user.role === "admin") {
      fetchAdminData();
    }
  }, [authLoading, user]);

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setDeleteEventLoading(true);
      try {
        await api.delete(`/api/v1/events/${eventId}`);
        setEvents(events.filter((event) => event._id !== eventId));
        setBestEvents(bestEvents.filter((event) => event._id !== eventId));
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete event");
      } finally {
        setDeleteEventLoading(false);
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user? This will also delete all their bookings."
      )
    ) {
      setDeleteUserLoading(true);
      try {
        await api.delete(`/api/v1/admin/users/${userId}`);
        setUsers(users.filter((u) => u._id !== userId));
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete user");
      } finally {
        setDeleteUserLoading(false);
      }
    }
  };

  if (authLoading || loading) return <Loader />;
  if (!user || user.role !== "admin")
    return <p className="text-center text-gray">Access denied. Admins only.</p>;
  if (error)
    return (
      <div className="bg-red-100 text-danger p-3 rounded max-w-7xl mx-auto">
        {error}
      </div>
    );

  return (
    <div className="py-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
        <Link
          to="/admin/events/create"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create New Event
        </Link>
      </div>
      {error && (
        <div className="bg-red-100 text-danger p-3 rounded mb-4">{error}</div>
      )}

      {/* Users Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">
          All Users and Their Bookings
        </h2>
        {users.length === 0 ? (
          <p className="text-gray">No users found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {users.map((u) => (
              <div
                key={u._id}
                className="border rounded-lg p-4 shadow-md flex justify-between items-start"
              >
                <div>
                  <h3 className="text-xl font-medium text-primary">
                    {u.userName} ({u.email})
                  </h3>
                  <p className="text-gray">Bookings: {u.bookings.length}</p>
                  {u.bookings.length > 0 ? (
                    <ul className="mt-2 ml-4 list-disc text-gray">
                      {u.bookings.map((booking) => (
                        <li key={booking._id}>
                          {booking.event?.name || "Event Not Found"} -{" "}
                          {booking.seats} seat(s)
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray">This user has no bookings yet.</p>
                  )}
                </div>
                <button
                  className="bg-danger text-white px-3 py-1 rounded hover:bg-red-700 disabled:bg-gray-400"
                  onClick={() => handleDeleteUser(u._id)}
                  disabled={deleteUserLoading || u._id === user._id}
                >
                  {deleteUserLoading ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Events Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">
          Events and Booking Counts
        </h2>
        {!loading && events.length === 0 && (
          <div className="text-center">
            <h2 className="text-xl text-gray">No events found</h2>
            <p className="text-gray">Create your first event to get started!</p>
            <Link
              to="/admin/events/create"
              className="mt-2 inline-block bg-primary text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Create New Event
            </Link>
          </div>
        )}
        {events.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Venue</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Available Seats</th>
                  <th className="p-3 text-left">Booked</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event._id} className="border-b">
                    <td className="p-3">{event.name}</td>
                    <td className="p-3">{formatDate(event.date)}</td>
                    <td className="p-3">{event.venue}</td>
                    <td className="p-3">${event.price.toFixed(2)}</td>
                    <td className="p-3">{event.availableSeats}</td>
                    <td className="p-3">{event.bookingCount || 0}</td>
                    <td className="p-3 flex gap-2">
                      <Link
                        to={`/events/${event._id}`}
                        className="bg-secondary text-white px-3 py-1 rounded hover:bg-gray-700"
                      >
                        View
                      </Link>
                      <Link
                        to={`/admin/events/edit/${event._id}`}
                        className="bg-primary text-white px-3 py-1 rounded hover:bg-blue-700"
                      >
                        Edit
                      </Link>
                      <button
                        className="bg-danger text-white px-3 py-1 rounded hover:bg-red-700 disabled:bg-gray-400"
                        onClick={() => handleDeleteEvent(event._id)}
                        disabled={deleteEventLoading}
                      >
                        {deleteEventLoading ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Best Events Section */}
      <section>
        <h2 className="text-2xl font-semibold text-primary mb-4">
          Best Events (Top 5)
        </h2>
        {bestEvents.length === 0 ? (
          <p className="text-gray">No events have been booked yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bestEvents.map((event) => (
              <div
                key={event._id}
                className="border rounded-lg p-4 shadow-md bg-green-50"
              >
                <h3 className="text-xl font-medium text-primary">
                  {event.name}
                </h3>
                <p className="text-gray">
                  Booked {event.bookingCount || 0} time(s)
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
