import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-secondary text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link to="/">Event Booking</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-primary">
                Dashboard
              </Link>
              <Link to="/bookings/history" className="hover:text-primary">
                Booking History
              </Link>
              {user.role === "admin" && (
                <Link to="/admin" className="hover:text-primary">
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-primary">
                Login
              </Link>
              <Link to="/register" className="hover:text-primary">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
