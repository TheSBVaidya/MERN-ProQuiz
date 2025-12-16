const express = require("express");
const router = express.Router();
const attemptController = require("../controllers/attemptController");

router.get("/attempts/:user_id", attemptController.getUserAttempts);

module.exports = router;
