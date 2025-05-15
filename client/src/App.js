import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EventDetails from "./pages/EventDetails";
import Dashboard from "./pages/Dashboard";
import BookingHistory from "./pages/BookingHistory";
import AdminDashboard from "./pages/AdminDashboard";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/events/:id" element={<EventDetails />} />

            {/* Protected Routes (require login) */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookings/history"
              element={
                <ProtectedRoute>
                  <BookingHistory />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/events/create"
              element={
                <AdminRoute>
                  <CreateEvent />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/events/edit/:id"
              element={
                <AdminRoute>
                  <EditEvent />
                </AdminRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
