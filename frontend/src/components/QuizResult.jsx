import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

const QuizResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const resultData = location.state?.resultData;

  // 1. Handle Missing Data
  if (!resultData) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
        <div className="text-center p-5 bg-white rounded-4 shadow">
          <h1 className="display-1 text-muted">😕</h1>
          <h2 className="text-danger fw-bold mt-3">No Results Found</h2>
          <p className="text-muted">It seems you haven't taken a quiz yet.</p>
          <Link
            to="/dashboard"
            className="btn btn-primary btn-lg rounded-pill px-5 mt-3 shadow-sm"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // 2. Extract Data
  const { total_correct, total_attempted, details } = resultData.data;
  const correctCount = parseInt(total_correct);
  const totalQuestions = parseInt(total_attempted);
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  const incorrectCount = totalQuestions - correctCount;

  // 3. Theme Logic
  let theme = {
    color: "",
    gradient: "",
    icon: "",
    message: "",
    subMessage: "",
  };

  if (percentage >= 80) {
    theme = {
      color: "#198754",
      gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
      icon: "🏆",
      message: "Outstanding!",
      subMessage: "You are a master of this subject.",
    };
  } else if (percentage >= 50) {
    theme = {
      color: "#ffc107",
      gradient: "linear-gradient(135deg, #f2994a 0%, #f2c94c 100%)",
      icon: "🌟",
      message: "Good Job!",
      subMessage: "You're on the right track.",
    };
  } else {
    theme = {
      color: "#dc3545",
      gradient: "linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)",
      icon: "💪",
      message: "Keep Trying!",
      subMessage: "Practice makes perfect.",
    };
  }

  // Helper for Option Styling
  const getOptionClass = (optionKey, userAns, correctAns) => {
    if (optionKey === correctAns) {
      return "bg-success-subtle border-success text-success-emphasis"; // Always Green for correct
    }
    if (optionKey === userAns && userAns !== correctAns) {
      return "bg-danger-subtle border-danger text-danger-emphasis"; // Red for wrong selection
    }
    return "bg-light text-dark border-light text-light-emphasis"; // Default
  };

  // Helper: Circular Progress Bar
  const CircularProgress = ({
    size = 180,
    strokeWidth = 15,
    percentage,
    color,
  }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="position-relative d-inline-flex align-items-center justify-content-center">
        <svg width={size} height={size} className="transform-rotate-90">
          <circle
            stroke="#e9ecef"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          <circle
            stroke={color}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            r={radius}
            cx={size / 2}
            cy={size / 2}
            style={{ transition: "stroke-dashoffset 1s ease-out" }}
          />
        </svg>
        <div className="position-absolute text-center">
          <span className="display-4 fw-bold text-dark">{percentage}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-vh-100 bg-light pb-5">
      {/* 1. Hero Section */}
      <div
        className="text-white pt-5 pb-5 px-3 mb-5 shadow-sm text-center position-relative"
        style={{
          background: theme.gradient,
          borderBottomLeftRadius: "50px",
          borderBottomRightRadius: "50px",
          minHeight: "300px",
        }}
      >
        <div className="container position-relative z-1">
          <div className="display-1 mb-2 animate-bounce">{theme.icon}</div>
          <h1 className="fw-bold display-4">{theme.message}</h1>
          <p className="lead opacity-75">{theme.subMessage}</p>
        </div>
      </div>

      {/* 2. Floating Score Card */}
      <div className="container" style={{ marginTop: "-120px" }}>
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden mb-5">
              <div className="card-body p-5 text-center bg-white">
                <div className="mb-4">
                  <CircularProgress
                    percentage={percentage}
                    color={theme.color}
                  />
                </div>

                <div className="row g-3">
                  <div className="col-4">
                    <div className="p-3 bg-light rounded-3">
                      <div className="h4 fw-bold text-primary mb-0">
                        {totalQuestions}
                      </div>
                      <small
                        className="text-muted text-uppercase"
                        style={{ fontSize: "10px" }}
                      >
                        Total
                      </small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-3 bg-light rounded-3">
                      <div className="h4 fw-bold text-success mb-0">
                        {correctCount}
                      </div>
                      <small
                        className="text-muted text-uppercase"
                        style={{ fontSize: "10px" }}
                      >
                        Correct
                      </small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-3 bg-light rounded-3">
                      <div className="h4 fw-bold text-danger mb-0">
                        {incorrectCount}
                      </div>
                      <small
                        className="text-muted text-uppercase"
                        style={{ fontSize: "10px" }}
                      >
                        Wrong
                      </small>
                    </div>
                  </div>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-center mt-4">
                  <Link
                    to="/dashboard"
                    className="btn btn-dark rounded-pill px-4 py-2 fw-bold"
                  >
                    Home
                  </Link>
                  <button
                    onClick={() => navigate("/history")}
                    className="btn btn-outline-dark rounded-pill px-4 py-2 fw-bold"
                  >
                    View History
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Detailed Analysis List */}
      <div className="container">
        <h4 className="fw-bold text-secondary mb-4 ps-2 border-start border-4 border-primary">
          &nbsp;Detailed Analysis
        </h4>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            {details.map((item, index) => {
              const isCorrect = item.score === 1;
              return (
                <div
                  key={index}
                  className="card border-0 shadow-sm mb-4 overflow-hidden"
                  style={{ borderRadius: "15px" }}
                >
                  {/* Question Header */}
                  <div className="card-header bg-white border-bottom p-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge bg-light text-dark border">
                        Q{index + 1}
                      </span>
                      <span
                        className={`badge ${
                          isCorrect ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {isCorrect ? "Correct" : "Incorrect"}
                      </span>
                    </div>
                    <h5 className="mb-0 fw-bold text-dark">
                      {item.question || `Question ${item.quiz_id}`}
                    </h5>
                  </div>

                  {/* Options Body */}
                  <div className="card-body p-4 bg-light bg-opacity-25">
                    <div className="d-grid gap-2">
                      {["a", "b", "c", "d"].map((optKey) => {
                        const optionText = item[optKey];
                        const stylingClass = getOptionClass(
                          optKey,
                          item.user_answer,
                          item.correct_answer
                        );

                        // Add icon based on status
                        let icon = null;
                        if (optKey === item.correct_answer) icon = "✅";
                        else if (
                          optKey === item.user_answer &&
                          item.user_answer !== item.correct_answer
                        )
                          icon = "❌";

                        return (
                          <div
                            key={optKey}
                            className={`p-3 rounded border d-flex justify-content-between align-items-center ${stylingClass}`}
                            style={{ transition: "all 0.2s" }}
                          >
                            <div>
                              <span className="fw-bold text-uppercase me-2">
                                {optKey}.
                              </span>
                              {optionText}
                            </div>
                            {icon && <span>{icon}</span>}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation / Footer if needed */}
                    {!isCorrect && (
                      <div className="mt-3 text-danger small">
                        <i className="bi bi-info-circle me-1"></i>
                        You selected{" "}
                        <strong>
                          Option {item.user_answer?.toUpperCase()}
                        </strong>
                        , but the correct answer is{" "}
                        <strong>
                          Option {item.correct_answer?.toUpperCase()}
                        </strong>
                        .
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .transform-rotate-90 { transform: rotate(-90deg); }
        .animate-bounce { animation: bounce 2s infinite; }
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
            40% {transform: translateY(-20px);}
            60% {transform: translateY(-10px);}
        }
      `}</style>
    </div>
  );
};

export default QuizResult;
