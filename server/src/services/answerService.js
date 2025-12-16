const answerModel = require("../models/answerModel");

const answerService = {
  async submitAnswers(userId, answers) {
    return await answerModel.InsertAnswer(userId, answers);
  },

  async calculateScore(attemptId) {
    const details = await answerModel.getAttemptScore(attemptId);
    const summary = await answerModel.getAttemptTotalScore(attemptId);

    return {
      details,
      total_correct: summary.total_correct,
      total_attempted: summary.total_attempted,
    };
  },
};

module.exports = answerService;
