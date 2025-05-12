import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import Bookings from "./pages/Bookings";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/events" element={<Events />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/admin" element={<Admin />} />
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}
