import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

const Register = ({ setUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await API.post("/users", formData);
      const userData = response.data.data;

      if (userData) {
        // Auto-login if data is returned
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        navigate("/dashboard");
      } else {
        // Fallback if no data returned
        alert("Registration Successful! Please Login.");
        navigate("/login");
      }
    } catch (error) {
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      {/* Decorative Background Circles */}
      <div
        className="position-absolute rounded-circle bg-white opacity-10"
        style={{
          width: "300px",
          height: "300px",
          top: "-50px",
          left: "-50px",
          opacity: 0.1,
        }}
      ></div>
      <div
        className="position-absolute rounded-circle bg-white opacity-10"
        style={{
          width: "200px",
          height: "200px",
          bottom: "-20px",
          right: "-20px",
          opacity: 0.1,
        }}
      ></div>

      {/* Main Card */}
      <div
        className="card border-0 shadow-lg p-4 p-md-5 rounded-5 position-relative z-1"
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "rgba(255, 255, 255, 0.95)",
        }}
      >
        <div className="card-body p-0">
          {/* Header */}
          <div className="text-center mb-4">
            <div
              className="d-inline-flex align-items-center justify-content-center bg-success bg-opacity-10 text-success rounded-circle mb-3"
              style={{ width: "70px", height: "70px" }}
            >
              <span className="display-6">🚀</span>
            </div>
            <h2 className="fw-bold text-dark">Create Account</h2>
            <p className="text-muted">Join us and start your journey today.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-3">
              <label
                className="form-label fw-bold small text-uppercase text-muted"
                style={{ fontSize: "11px", letterSpacing: "1px" }}
              >
                Full Name
              </label>
              <input
                type="text"
                className="form-control form-control-lg bg-light border-0 fs-6"
                placeholder="John Doe"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                style={{ padding: "15px" }}
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label
                className="form-label fw-bold small text-uppercase text-muted"
                style={{ fontSize: "11px", letterSpacing: "1px" }}
              >
                Email Address
              </label>
              <input
                type="email"
                className="form-control form-control-lg bg-light border-0 fs-6"
                placeholder="name@example.com"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                style={{ padding: "15px" }}
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label
                className="form-label fw-bold small text-uppercase text-muted"
                style={{ fontSize: "11px", letterSpacing: "1px" }}
              >
                Password
              </label>
              <input
                type="password"
                className="form-control form-control-lg bg-light border-0 fs-6"
                placeholder="••••••••"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                style={{ padding: "15px" }}
              />
            </div>

            <button
              type="submit"
              className="btn w-100 py-3 rounded-pill fw-bold text-white shadow-sm hover-scale"
              disabled={loading}
              style={{
                background: "linear-gradient(to right, #11998e, #38ef7d)",
                border: "none",
                transition: "transform 0.2s",
              }}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Creating Account...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-4">
            <p className="text-muted small">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-success fw-bold text-decoration-none"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Simple Hover Effect Style */}
      <style>{`
        .hover-scale:hover { transform: scale(1.02); }
      `}</style>
    </div>
  );
};

export default Register;
