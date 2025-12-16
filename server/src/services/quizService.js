const QuizModel = require("../models/quizModel");

const userService = {
  async getQuizzesPaginated(page = 1, perPage = 10) {
    const limit = perPage;
    const offset = (page - 1) * perPage;

    const { rows, total } = await QuizModel.findAllPaginated(limit, offset);
    return { rows, total };
  },

  async getQuizById(id) {
    const rows = await QuizModel.findById(id);
    return rows;
  },
};

module.exports = userService;
