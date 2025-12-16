const express = require("express");
const answerController = require("../controllers/answerController");
const router = express.Router();

router.post("/submit", answerController.submitAnswer);
router.get("/score/:attempt_id", answerController.getUserScore);

module.exports = router;
