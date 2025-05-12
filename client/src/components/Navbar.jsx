import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          EventBook
        </Link>
        <div className="flex gap-4">
          {user ? (
            <>
              {user.role === "admin" && (
                <Link to="/admin" className="hover:text-gray-300">
                  Admin
                </Link>
              )}
              <Link to="/bookings" className="hover:text-gray-300">
                Bookings
              </Link>
              <button onClick={logout} className="hover:text-gray-300">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link to="/register" className="hover:text-gray-300">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
