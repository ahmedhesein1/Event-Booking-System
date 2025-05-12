import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get("/api/v1/auth/me", {
          withCredentials: true,
        });
        setUser(data.data);
      } catch (error) {
        setUser(null);
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const { data } = await axios.post(
      "/api/v1/auth/login",
      { email, password },
      { withCredentials: true }
    );
    setUser(data.data);
  };

  const register = async (username, email, password) => {
    await axios.post(
      "/api/v1/auth/register",
      { username, email, password },
      { withCredentials: true }
    );
    const { data } = await axios.get("/api/v1/auth/me", {
      withCredentials: true,
    });
    setUser(data.data);
  };

  const logout = async () => {
    await axios.post("/api/v1/auth/logout", {}, { withCredentials: true });
    setUser(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
