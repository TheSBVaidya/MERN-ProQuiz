import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ user }) => {
  const navigate = useNavigate();

  // State for Custom Quiz Modal
  const [showModal, setShowModal] = useState(false);
  const [customAmount, setCustomAmount] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const startQuiz = (amount) => {
    navigate(`/quiz?amount=${amount}`);
  };

  const openCustomModal = () => {
    setShowModal(true);
    setCustomAmount("");
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (customAmount > 0 && customAmount <= 100) {
      startQuiz(customAmount);
      setShowModal(false);
    } else {
      alert("Please enter a number between 1 and 100");
    }
  };

  // Helper component for the Gradient Cards
  const QuizCard = ({ icon, title, subtitle, gradient, onClick }) => (
    <div className="col-md-3 col-sm-6">
      <div
        className="card h-100 border-0 text-center text-white p-4"
        onClick={onClick}
        style={{
          cursor: "pointer",
          background: gradient,
          borderRadius: "20px",
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-10px)";
          e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
        }}
      >
        <div className="card-body d-flex flex-column justify-content-center">
          <div className="display-3 mb-3">{icon}</div>
          <h4 className="card-title fw-bold">{title}</h4>
          <p className="card-text opacity-75">{subtitle}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-vh-100" style={{ background: "#f8f9fa" }}>
      {/* 1. Creative Hero Section */}
      <div
        className="text-white pt-5 pb-5 px-4 mb-5 shadow-sm"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderBottomLeftRadius: "50px",
          borderBottomRightRadius: "50px",
        }}
      >
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <div className="mb-3 mb-md-0">
              <h1 className="display-5 fw-bold mb-1">
                👋 Hello, {user?.name || "Champion"}
              </h1>
              <p className="lead opacity-75 mb-0">
                What challenge will you conquer today?
              </p>
            </div>

            <div className="d-flex gap-3">
              <button
                onClick={() => navigate("/history")}
                className="btn btn-light rounded-pill px-4 fw-bold shadow-sm"
                style={{ color: "#764ba2" }}
              >
                📜 History
              </button>
              <button
                onClick={handleLogout}
                className="btn btn-outline-light rounded-pill px-4"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Content Grid */}
      <div className="container pb-5">
        <h3 className="fw-bold text-secondary mb-4 ps-2 border-start border-4 border-primary">
          &nbsp;Select Quiz Mode
        </h3>

        <div className="row g-4">
          {/* 20 Questions - Blue Gradient */}
          <QuizCard
            icon="⚡"
            title="Rapid Fire"
            subtitle="20 Questions • Quick Refresh"
            gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
            onClick={() => startQuiz(20)}
          />

          {/* 50 Questions - Purple/Pink Gradient */}
          <QuizCard
            icon="📚"
            title="Deep Dive"
            subtitle="50 Questions • Knowledge Test"
            gradient="linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)"
            onClick={() => startQuiz(50)}
          />

          {/* 100 Questions - Orange/Gold Gradient */}
          <QuizCard
            icon="🏆"
            title="Grand Mock"
            subtitle="100 Questions • Full Exam"
            gradient="linear-gradient(135deg, #f6d365 0%, #fda085 100%)"
            onClick={() => startQuiz(100)}
          />

          {/* Custom - Dashed/Glass Style */}
          <div className="col-md-3 col-sm-6">
            <div
              className="card h-100 text-center p-4 bg-white"
              onClick={openCustomModal}
              style={{
                cursor: "pointer",
                border: "3px dashed #cbd5e0",
                borderRadius: "20px",
                color: "#718096",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#667eea";
                e.currentTarget.style.color = "#667eea";
                e.currentTarget.style.backgroundColor = "#f0f4ff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#cbd5e0";
                e.currentTarget.style.color = "#718096";
                e.currentTarget.style.backgroundColor = "white";
              }}
            >
              <div className="card-body d-flex flex-column justify-content-center">
                <div className="display-3 mb-3">⚙️</div>
                <h4 className="card-title fw-bold">Custom</h4>
                <p className="card-text">Configure your own</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Custom Quiz Modal (Glassmorphism Effect) */}
      {showModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
            zIndex: 1050,
            backdropFilter: "blur(5px)", // Glass effect
          }}
        >
          <div
            className="bg-white p-5 rounded-4 shadow-lg position-relative"
            style={{
              width: "90%",
              maxWidth: "400px",
              animation: "fadeIn 0.3s",
            }}
          >
            {/* Close Button */}
            <button
              className="btn-close position-absolute top-0 end-0 m-3"
              onClick={() => setShowModal(false)}
            ></button>

            <div className="text-center mb-4">
              <span className="display-4">🎯</span>
              <h3 className="fw-bold mt-2">Custom Challenge</h3>
              <p className="text-muted">How many questions can you handle?</p>
            </div>

            <form onSubmit={handleCustomSubmit}>
              <div className="mb-4">
                <input
                  type="number"
                  className="form-control form-control-lg text-center fs-3 fw-bold text-primary"
                  placeholder="25"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  min="1"
                  max="100"
                  autoFocus
                  style={{ borderRadius: "15px" }}
                />
                <small className="text-muted d-block text-center mt-2">
                  Enter between 1 - 100
                </small>
              </div>
              <div className="d-grid gap-3">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg rounded-pill fw-bold shadow"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    border: "none",
                  }}
                >
                  Start Quiz
                </button>
                <button
                  type="button"
                  className="btn btn-light rounded-pill"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Simple fade-in animation style */}
      <style>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
