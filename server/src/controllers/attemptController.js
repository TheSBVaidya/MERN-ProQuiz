const attemptService = require("../services/attemptService");
const { apiSuccess, apiError } = require("../utils/apiResponse");

const attemptController = {
  async getUserAttempts(req, res) {
    try {
      const { user_id } = req.params;

      if (!user_id) return res.status(400).json(apiError("User ID missing"));

      const data = await attemptService.getUserAttemptsWithDetails(user_id);

      return res.status(200).json(apiSuccess(data));
    } catch (err) {
      console.error("Fetch attempts error:", err);
      return res.status(500).json(apiError("Failed to fetch attempts"));
    }
  },
};

module.exports = attemptController;
