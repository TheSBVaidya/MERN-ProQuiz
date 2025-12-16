const express = require("express");
const cors = require("cors");
const quizRoutes = require("./routes/quizRoutes");
const userRoutes = require("./routes/userRoutes");
const answerRotes = require("./routes/answerRoutes");
const attemptRoutes = require("./routes/attemptRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/quizzes", quizRoutes);
app.use("/api/users", userRoutes);
app.use("/api/answer", answerRotes);
app.use("/api", attemptRoutes);

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use((req, res) =>
  res.status(404).json({ status: "error", message: "Not found" })
);

module.exports = app;
