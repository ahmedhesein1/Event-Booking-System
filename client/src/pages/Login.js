import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./AuthForms.css";

const Login = () => {
  const { login, loading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    clearError();
    setFormError(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.email || !formData.password) {
      setFormError("Please fill in all fields");
      return;
    }

    const result = await login(formData);
    if (result.success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to Your Account</h2>

        {(error || formError) && (
          <div className="alert alert-danger">{error || formError}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
