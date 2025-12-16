const answerService = require("../services/answerService");
const { apiError, apiSuccess } = require("../utils/apiResponse");

const answerController = {
  async submitAnswer(req, res) {
    try {
      const { user_id, answers } = req.body;

      if (!user_id) return res.status(400).json(apiError("User is not login"));

      if (!answers || !Array.isArray(answers) || answers.length === 0)
        return res.status(400).json(apiError("Answer is not submited"));

      const result = await answerService.submitAnswers(user_id, answers);

      return res.status(201).json(
        apiSuccess({
          attempt_id: result.attemptId,
          user_id,
          total_answers: answers.length,
        })
      );
    } catch (err) {
      console.error("Submit answers error:", err);
      return res.status(500).json(apiError("Failed to submit answers"));
    }
  },

  async getUserScore(req, res) {
    try {
      const { attempt_id } = req.params;

      const result = await answerService.calculateScore(attempt_id);

      return res.status(200).json(apiSuccess(result));
    } catch (err) {
      console.error("score error:", err);
      return res.status(500).json(apiError("Failed to calculate score"));
    }
  },
};

module.exports = answerController;
