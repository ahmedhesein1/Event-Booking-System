import React, { createContext, useState, useEffect } from "react";
import api from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await api.get("/api/v1/auth/me");
        setUser(data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post("/api/v1/auth/login", { email, password });
    setUser(data);
  };

  const register = async (email, userName, password) => {
    const { data } = await api.post("/api/v1/auth/register", {
      userName,
      email,
      password,
    });
    setUser(data);
  };

  const logout = async () => {
    await api.post("/api/v1/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
