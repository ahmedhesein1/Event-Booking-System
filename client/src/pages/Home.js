import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import Loader from "../components/Loader";
import api from "../utils/api";
import "./Home.css";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

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

  // Filter events by category
  const filteredEvents =
    filter === "all"
      ? events
      : events.filter((event) => event.category === filter);

  // Sort events by date (upcoming first)
  const sortedEvents = [...filteredEvents].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  if (loading) return <Loader />;

  return (
    <div className="home">
      <div className="home-header">
        <h1>Upcoming Events</h1>
        <div className="filter-container">
          <label htmlFor="filter">Filter by:</label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="concert">Concert</option>
            <option value="conference">Conference</option>
            <option value="sports">Sports</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && sortedEvents.length === 0 && (
        <div className="no-events">
          <h2>No events found</h2>
          <p>Try changing your filter or check back later.</p>
        </div>
      )}

      <div className="events-grid">
        {sortedEvents.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Home;
