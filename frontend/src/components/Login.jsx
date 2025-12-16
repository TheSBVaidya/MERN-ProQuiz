import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await API.post("/users/login", formData);
      const userData = response.data.data;

      if (userData) {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        navigate("/dashboard");
      }
    } catch (error) {
      alert("Login failed. Please check your credentials.");
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
          <div className="text-center mb-5">
            <div
              className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 text-primary rounded-circle mb-3"
              style={{ width: "70px", height: "70px" }}
            >
              <span className="display-6">👋</span>
            </div>
            <h2 className="fw-bold text-dark">Welcome Back</h2>
            <p className="text-muted">Please enter your details to sign in.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
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

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rememberMe"
                />
                <label
                  className="form-check-label text-muted small"
                  htmlFor="rememberMe"
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="small text-primary text-decoration-none fw-bold"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="btn w-100 py-3 rounded-pill fw-bold text-white shadow-sm hover-scale"
              disabled={loading}
              style={{
                background: "linear-gradient(to right, #667eea, #764ba2)",
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
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-5">
            <p className="text-muted small">
              Don't have an account yet?{" "}
              <Link
                to="/register"
                className="text-primary fw-bold text-decoration-none"
              >
                Create Account
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

export default Login;
