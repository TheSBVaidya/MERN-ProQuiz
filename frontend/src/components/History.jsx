import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Stats for the summary header
  const [stats, setStats] = useState({
    totalAttempts: 0,
    bestScore: 0,
    average: 0,
  });

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const user = storedUser ? JSON.parse(storedUser) : null;

        if (!user) return;

        const response = await API.get(`/attempts/${user.id}`);
        const data = response.data.data || [];

        // Sort by newest first
        const sortedData = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setHistory(sortedData);

        // Calculate Stats
        if (sortedData.length > 0) {
          const best = Math.max(
            ...sortedData.map(
              (h) => (h.total_correct / h.total_attempted) * 100
            )
          );
          setStats({
            totalAttempts: sortedData.length,
            bestScore: best.toFixed(0),
          });
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching history", error);
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleViewDetails = (attemptData) => {
    navigate("/result", {
      state: {
        resultData: {
          data: attemptData,
        },
      },
    });
  };

  // Helper component for the Circular Progress
  const CircularScore = ({ correct, total }) => {
    const percentage = Math.round((correct / total) * 100);
    const color = percentage >= 50 ? "#198754" : "#dc3545"; // Green or Red

    return (
      <div
        className="position-relative d-inline-flex align-items-center justify-content-center"
        style={{ width: "80px", height: "80px" }}
      >
        {/* Background Circle */}
        <div
          className="position-absolute w-100 h-100 rounded-circle"
          style={{
            background: `conic-gradient(${color} ${
              percentage * 3.6
            }deg, #e9ecef 0deg)`,
          }}
        ></div>
        {/* Inner White Circle */}
        <div
          className="position-absolute bg-white rounded-circle d-flex flex-column align-items-center justify-content-center"
          style={{ width: "65px", height: "65px" }}
        >
          <span className="fw-bold fs-5" style={{ color: color }}>
            {percentage}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-vh-100" style={{ background: "#f8f9fa" }}>
      {/* 1. Creative Header Section */}
      <div
        className="bg-white shadow-sm pt-5 pb-5 px-4 mb-5"
        style={{
          borderBottomLeftRadius: "50px",
          borderBottomRightRadius: "50px",
        }}
      >
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="fw-bold text-dark mb-0">Your Journey</h1>
              <p className="text-muted">
                Track your progress and improvements.
              </p>
            </div>
            <Link
              to="/dashboard"
              className="btn btn-outline-dark rounded-pill px-4"
            >
              ← Dashboard
            </Link>
          </div>

          {/* Stats Cards */}
          {!loading && history.length > 0 && (
            <div className="row g-3">
              <div className="col-md-4 col-6">
                <div
                  className="p-3 rounded-4 text-white"
                  style={{
                    background: "linear-gradient(45deg, #4e54c8, #8f94fb)",
                  }}
                >
                  <h2 className="fw-bold mb-0">{stats.totalAttempts}</h2>
                  <small className="text-white-50">Total Quizzes</small>
                </div>
              </div>
              <div className="col-md-4 col-6">
                <div
                  className="p-3 rounded-4 text-white"
                  style={{
                    background: "linear-gradient(45deg, #11998e, #38ef7d)",
                  }}
                >
                  <h2 className="fw-bold mb-0">{stats.bestScore}%</h2>
                  <small className="text-white-50">Best Score</small>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Content Area */}
      <div className="container pb-5">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-5">
            <div className="display-1 mb-3">🕸️</div>
            <h3 className="text-muted">No history found</h3>
            <p>Start a quiz to create your first memory!</p>
          </div>
        ) : (
          <div>
            <h4 className="fw-bold mb-4 text-secondary">Recent Attempts</h4>

            <div className="row g-4">
              {history.map((item, index) => {
                const percentage =
                  (item.total_correct / item.total_attempted) * 100;
                const isPass = percentage >= 50;

                return (
                  <div
                    key={item.attempt_id || index}
                    className="col-lg-4 col-md-6"
                  >
                    <div
                      className="card border-0 shadow-sm h-100 overflow-hidden"
                      style={{
                        borderRadius: "20px",
                        transition: "transform 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "translateY(-5px)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "translateY(0)")
                      }
                    >
                      <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div>
                            <div
                              className="text-uppercase fw-bold text-muted"
                              style={{ fontSize: "0.75rem" }}
                            >
                              {new Date(item.created_at).toLocaleDateString(
                                undefined,
                                { weekday: "long" }
                              )}
                            </div>
                            <h5 className="fw-bold mb-0">
                              {new Date(item.created_at).toLocaleDateString()}
                            </h5>
                            <small className="text-muted">
                              {new Date(item.created_at).toLocaleTimeString(
                                [],
                                { hour: "2-digit", minute: "2-digit" }
                              )}
                            </small>
                          </div>
                          {/* Pass/Fail Badge */}
                          <span
                            className={`badge rounded-pill px-3 py-2 ${
                              isPass
                                ? "bg-success-subtle text-success"
                                : "bg-danger-subtle text-danger"
                            }`}
                          >
                            {isPass ? "PASSED" : "FAILED"}
                          </span>
                        </div>

                        <div className="d-flex align-items-center justify-content-between mt-4">
                          {/* Visual Score Circle */}
                          <CircularScore
                            correct={item.total_correct}
                            total={item.total_attempted}
                          />

                          <div className="text-end">
                            <h4 className="mb-0 fw-bold">
                              {item.total_correct} / {item.total_attempted}
                            </h4>
                            <small className="text-muted">
                              Correct Answers
                            </small>
                          </div>
                        </div>

                        <hr
                          className="my-4 text-muted"
                          style={{ opacity: 0.1 }}
                        />

                        <button
                          onClick={() => handleViewDetails(item)}
                          className="btn btn-light w-100 fw-bold py-2 rounded-3 text-primary"
                          style={{ background: "#f0f4ff" }}
                        >
                          View Full Analysis →
                        </button>
                      </div>

                      {/* Decorative bottom border */}
                      <div
                        style={{
                          height: "5px",
                          background: isPass ? "#198754" : "#dc3545",
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
