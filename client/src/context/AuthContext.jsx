import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if user is already logged in on page load
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const { data } = await api.get("/api/v1/auth/me");
        setUser(data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Register user
  const register = async (userData) => {
    setLoading(true);
    try {
      const { data } = await api.post("/api/v1/auth/register", userData);
      setUser(data);
      navigate("/dashboard");
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      return {
        success: false,
        message: err.response?.data?.message || "Registration failed",
      };
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (credentials) => {
    setLoading(true);
    try {
      const { data } = await api.post("/api/v1/auth/login", credentials);
      setUser(data);
      navigate("/dashboard");
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await api.post("/api/v1/auth/logout");
      setUser(null);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Logout failed");
    }
  };

  // Clear error
  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        clearError,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
