import React, { useState, useEffect, useContext } from "react";
import EventList from "../components/events/EventList";
import Loader from "../components/layout/Loader";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [bookedEvents, setBookedEvents] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch events with pagination
        const eventsResponse = await api.get("/api/v1/events", {
          params: { page, limit: 10 },
        });
        const { events, totalPages: total } = eventsResponse.data;
        setEvents(events || []);
        setTotalPages(total || 1);

        // Fetch bookings if user is logged in
        if (user) {
          const bookingsResponse = await api.get("/api/v1/bookings");
          const bookedEventIds = new Set(
            bookingsResponse.data.map((booking) => booking.event._id.toString())
          );
          setBookedEvents(bookedEventIds);
        } else {
          setBookedEvents(new Set()); // Clear booked events if not logged in
        }
      } catch (err) {
        console.error("Fetch events or bookings error:", err);
        setError(
          err.response?.data?.message || "Failed to fetch events or bookings"
        );
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchData();
    }
  }, [authLoading, user, page]); // Re-run on page change or user/auth change

  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "all" || event.category === filter)
  );

  if (authLoading || loading) return <Loader />;

  return (
    <div className="py-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6 flex-col md:flex-row gap-4">
        <h1 className="text-2xl font-bold text-primary">All Events</h1>
        <div className="flex gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-64 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full md:w-48 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Categories</option>
            <option value="concert">Concert</option>
            <option value="conference">Conference</option>
            <option value="sports">Sports</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      {error && (
        <div className="bg-red-100 text-danger p-3 rounded mb-4">{error}</div>
      )}
      {!loading && filteredEvents.length === 0 && (
        <div className="text-center">
          <h2 className="text-xl text-gray">No events found</h2>
          <p className="text-gray">
            Check back later or try a different filter.
          </p>
        </div>
      )}
      <EventList events={filteredEvents} bookedEvents={bookedEvents} />
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
