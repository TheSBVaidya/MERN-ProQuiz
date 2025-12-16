const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");

router.get("/", quizController.fetchQuizzes);
router.get("/:id", quizController.fetchQuizById);

module.exports = router;
