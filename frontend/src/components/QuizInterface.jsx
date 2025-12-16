import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../api";

const QuizInterface = () => {
  const [searchParams] = useSearchParams();
  const amount = searchParams.get("amount") || 20;

  const [questionList, setQuestionList] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await API.get(`/quizzes?page=1&limit=${amount}`);
        const questionsArray = response.data.data.rows;

        setQuestionList(questionsArray || []);

        if (questionsArray && questionsArray.length > 0) {
          setCurrentQuestion(questionsArray[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz list", error);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [amount]);

  const handleOptionClick = (optionKey) => {
    if (!currentQuestion) return;
    const newAnswers = { ...selectedAnswers, [currentQuestion.id]: optionKey };
    setSelectedAnswers(newAnswers);
  };

  const handleFlagClick = () => {
    if (!currentQuestion) return;
    let newFlags;
    if (flaggedQuestions.includes(currentQuestion.id)) {
      newFlags = flaggedQuestions.filter((id) => id !== currentQuestion.id);
    } else {
      newFlags = [...flaggedQuestions, currentQuestion.id];
    }
    setFlaggedQuestions(newFlags);
  };

  const handleQuestionSelect = async (id) => {
    const foundQuestion = questionList.find((q) => q.id === id);
    if (foundQuestion) {
      setCurrentQuestion(foundQuestion);
    } else {
      try {
        const response = await API.get(`/quizzes/${id}`);
        setCurrentQuestion(response.data.data);
      } catch (error) {
        console.error("Error fetching question detail", error);
      }
    }
  };

  const handleNext = () => {
    if (!currentQuestion || !questionList.length) return;
    const currentIndex = questionList.findIndex(
      (q) => q.id === currentQuestion.id
    );
    if (currentIndex < questionList.length - 1) {
      handleQuestionSelect(questionList[currentIndex + 1].id);
    }
  };

  const handlePrev = () => {
    if (!currentQuestion || !questionList.length) return;
    const currentIndex = questionList.findIndex(
      (q) => q.id === currentQuestion.id
    );
    if (currentIndex > 0) {
      handleQuestionSelect(questionList[currentIndex - 1].id);
    }
  };

  const handleSubmit = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;

      if (!user) {
        alert("User not logged id!");
        return;
      }

      const formattedAnswer = Object.entries(selectedAnswers).map(
        ([qId, ans]) => ({
          quiz_id: parseInt(qId),
          answer: ans,
        })
      );

      const payload = {
        user_id: user.id,
        answers: formattedAnswer,
      };

      console.log("Submitting Payload:", payload);

      const response = await API.post("/answer/submit", payload);
      if (response.data.status === "success") {
        const attempt_id = response.data.data.attempt_id;
        const scoreResponse = await API.get(`/answer/score/${attempt_id}`);
        const resultData = scoreResponse.data;

        navigate("/result", {
          state: { resultData: resultData },
        });
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Failed to submit quiz. Check console for details.");
    }
  };

  const getButtonClass = (qId) => {
    if (currentQuestion && currentQuestion.id === qId)
      return "bg-primary text-white shadow-lg scale-110";
    if (flaggedQuestions.includes(qId))
      return "bg-warning text-dark border-warning";
    if (selectedAnswers[qId]) return "bg-success text-white border-success";
    return "bg-white text-secondary border-light hover-bg-light";
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div
          className="spinner-grow text-primary"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  const currentIndex = questionList.findIndex(
    (q) => q?.id === currentQuestion?.id
  );
  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = currentIndex === questionList.length - 1;
  const progressPercentage =
    (Object.keys(selectedAnswers).length / questionList.length) * 100;

  return (
    <div
      className="d-flex flex-column flex-lg-row vh-100 w-100 overflow-hidden"
      style={{ background: "#f3f4f6" }}
    >
      {/* LEFT: Main Question Area */}
      <div className="flex-grow-1 d-flex flex-column overflow-hidden position-relative">
        {/* Top Bar: Progress & Branding */}
        <div className="bg-white px-4 py-3 border-bottom d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3 w-50">
            <span className="fw-bold text-primary">Quiz Progress</span>
            <div
              className="progress flex-grow-1"
              style={{ height: "8px", borderRadius: "10px" }}
            >
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                  width: `${progressPercentage}%`,
                  background:
                    "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                }}
              ></div>
            </div>
          </div>
          <div className="text-muted small fw-bold">
            {Object.keys(selectedAnswers).length} / {questionList.length}{" "}
            Answered
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-grow-1 overflow-auto p-3 p-md-5 d-flex justify-content-center">
          {currentQuestion ? (
            <div className="w-100" style={{ maxWidth: "900px" }}>
              <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                {/* Card Header / Flag */}
                <div className="card-header bg-white border-0 pt-4 px-4 d-flex justify-content-between align-items-center">
                  <span className="badge bg-light text-primary border border-primary px-3 py-2 rounded-pill fs-6">
                    Question {currentIndex + 1}
                  </span>
                  <button
                    onClick={handleFlagClick}
                    className={`btn btn-sm rounded-pill px-3 fw-bold transition-all ${
                      flaggedQuestions.includes(currentQuestion.id)
                        ? "btn-warning text-dark shadow-sm"
                        : "btn-light text-muted"
                    }`}
                  >
                    {flaggedQuestions.includes(currentQuestion.id) ? (
                      <span>
                        <i className="bi bi-flag-fill me-1"></i> Flagged
                      </span>
                    ) : (
                      <span>
                        <i className="bi bi-flag me-1"></i> Flag for later
                      </span>
                    )}
                  </button>
                </div>

                <div className="card-body p-4 p-md-5">
                  {/* Question Text */}
                  <h4
                    className="fw-bold text-dark mb-5 lh-base"
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {currentQuestion.question}
                  </h4>

                  {/* Options Grid */}
                  <div className="d-grid gap-3 mb-5">
                    {["a", "b", "c", "d"].map((optKey) => {
                      const isSelected =
                        selectedAnswers[currentQuestion.id] === optKey;
                      return (
                        <div
                          key={optKey}
                          onClick={() => handleOptionClick(optKey)}
                          className={`p-3 rounded-3 border d-flex align-items-center cursor-pointer transition-all ${
                            isSelected
                              ? "bg-primary-subtle border-primary text-primary"
                              : "bg-white border-light-subtle hover-shadow"
                          }`}
                          style={{
                            cursor: "pointer",
                            borderWidth: isSelected ? "2px" : "1px",
                            transform: isSelected ? "scale(1.01)" : "scale(1)",
                            transition: "all 0.2s ease",
                          }}
                        >
                          <div
                            className={`rounded-circle d-flex align-items-center justify-content-center me-3 fw-bold ${
                              isSelected
                                ? "bg-primary text-white"
                                : "bg-light text-secondary"
                            }`}
                            style={{
                              width: "40px",
                              height: "40px",
                              minWidth: "40px",
                            }}
                          >
                            {optKey.toUpperCase()}
                          </div>
                          <span
                            className={`fs-5 ${isSelected ? "fw-bold" : ""}`}
                          >
                            {currentQuestion[optKey]}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer Navigation Buttons */}
                  <div className="d-flex justify-content-between align-items-center pt-4 border-top">
                    <button
                      className="btn btn-outline-secondary rounded-pill px-4 py-2 fw-bold"
                      onClick={handlePrev}
                      disabled={isFirstQuestion}
                    >
                      ← Previous
                    </button>

                    <button
                      className="btn text-white rounded-pill px-5 py-2 fw-bold shadow-sm"
                      style={{
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        border: "none",
                      }}
                      onClick={handleNext}
                      disabled={isLastQuestion}
                    >
                      Next Question →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="d-flex flex-column align-items-center justify-content-center h-100 text-muted">
              <div
                className="spinner-border text-primary mb-3"
                role="status"
              ></div>
              <h4>Loading Question...</h4>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: Sidebar */}
      <div
        className="bg-white border-start shadow-sm d-flex flex-column z-1"
        style={{ width: "340px", minWidth: "340px", height: "100vh" }}
      >
        <div className="p-4 border-bottom bg-white">
          <h5 className="mb-0 fw-bold">Question Palette</h5>
          <small className="text-muted">Navigate through your exam</small>
        </div>

        {/* Scrollable Grid Area */}
        <div className="flex-grow-1 overflow-auto p-4 custom-scrollbar">
          {/* Legend */}
          <div className="d-flex flex-wrap gap-2 mb-4 justify-content-center p-3 bg-light rounded-3">
            <div className="d-flex align-items-center gap-1">
              <span className="badge bg-success rounded-circle p-1"> </span>{" "}
              <small>Answered</small>
            </div>
            <div className="d-flex align-items-center gap-1">
              <span className="badge bg-warning rounded-circle p-1"> </span>{" "}
              <small>Flagged</small>
            </div>
            <div className="d-flex align-items-center gap-1">
              <span className="badge bg-primary rounded-circle p-1"> </span>{" "}
              <small>Current</small>
            </div>
            <div className="d-flex align-items-center gap-1">
              <span className="badge bg-white border rounded-circle p-1">
                {" "}
              </span>{" "}
              <small>Not Visited</small>
            </div>
          </div>

          <div
            className="d-grid grid-cols-5 gap-2"
            style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)" }}
          >
            {questionList.map((q, index) => {
              const btnClass = getButtonClass(q.id);
              // Extract just the background logic for custom styling if needed, or use the class directly
              // Mapping custom styles based on state logic from getButtonClass
              let styleObj = {
                width: "45px",
                height: "45px",
                transition: "all 0.2s",
              };

              return (
                <button
                  key={q.id}
                  className={`btn fw-bold rounded-3 d-flex align-items-center justify-content-center border ${
                    currentQuestion?.id === q.id
                      ? "shadow-sm ring-2 ring-primary"
                      : ""
                  } ${
                    flaggedQuestions.includes(q.id)
                      ? "btn-warning"
                      : selectedAnswers[q.id]
                      ? "btn-success text-white"
                      : currentQuestion?.id === q.id
                      ? "btn-primary text-white"
                      : "btn-light text-secondary bg-white"
                  }`}
                  style={styleObj}
                  onClick={() => handleQuestionSelect(q.id)}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Fixed Bottom Submit Button */}
        <div className="p-4 border-top bg-white">
          <button
            className="btn w-100 py-3 fw-bold text-white shadow rounded-pill"
            style={{
              background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
              border: "none",
              letterSpacing: "1px",
            }}
            onClick={handleSubmit}
          >
            SUBMIT QUIZ
          </button>
        </div>
      </div>

      {/* CSS for hover effects */}
      <style>{`
        .hover-shadow:hover {
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            background-color: #f8f9fa !important;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c1c1c1; 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8; 
        }
      `}</style>
    </div>
  );
};

export default QuizInterface;
