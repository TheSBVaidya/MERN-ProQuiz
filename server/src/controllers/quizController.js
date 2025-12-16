const quizService = require("../services/quizService");
const { apiError, apiSuccess } = require("../utils/apiResponse");

const MAX_LIMIT = 100;

const quizController = {
  async fetchQuizzes(req, res) {
    try {
      let page = parseInt(req.query.page, 10) || 1;
      let limit = parseInt(req.query.limit, 10) || 10;

      if (page < 1) page = 1;
      if (limit < 1) limit = 1;
      if (limit > MAX_LIMIT) limit = MAX_LIMIT;

      const { rows, total } = await quizService.getQuizzesPaginated(
        page,
        limit
      );

      const total_pages = Math.ceil(total / limit);

      const result = {
        rows,
        meta: {
          total,
          page,
          per_page: limit,
          total_pages,
        },
      };

      return res.status(200).json(apiSuccess(result));
    } catch (err) {
      console.error("fetch quizzes error: ", err);
      return res.status(500).json(apiError("Failed to fetch quizzes"));
    }
  },

  async fetchQuizById(req, res) {
    try {
      const id = req.params.id;
      console.log(id);
      const result = await quizService.getQuizById(id);
      if (!result) return res.status(404).json(apiError("Quiz not found"));
      return res.status(200).json(apiSuccess(result));
    } catch (err) {
      console.error("fetch quizzes error: ", err);
      return res.status(500).json(apiError("Failed to fetch quizzes"));
    }
  },
};

module.exports = quizController;
