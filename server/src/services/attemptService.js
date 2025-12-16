const attemptModel = require("../models/attemptModel");

const attemptService = {
  async getUserAttemptsWithDetails(userId) {
    const attempts = await attemptModel.getAttemptsByUser(userId);

    const result = [];
    for (let att of attempts) {
      const details = await attemptModel.getAttemptDetails(att.attempt_id);
      const summary = await attemptModel.getAttemptSummary(att.attempt_id);

      result.push({
        attempt_id: att.attempt_id,
        created_at: att.created_at,
        total_correct: summary.total_correct,
        total_attempted: summary.total_attempted,
        details: details,
      });
    }

    return result;
  },
};

module.exports = attemptService;
