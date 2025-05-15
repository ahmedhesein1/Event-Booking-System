import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../AuthForms.css";

const Register = () => {
  const { register, loading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (!formData.userName || !formData.email || !formData.password) {
      setFormError("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

    const { confirmPassword, ...registerData } = formData;

    const result = await register(registerData);
    if (result.success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create an Account</h2>

        {(error || formError) && (
          <div className="alert alert-danger">{error || formError}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              id="userName"
              name="userName"
              className="form-control"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </div>

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

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-control"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
