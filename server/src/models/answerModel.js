const dbpool = require("../config/dbpool");

const answerModel = {
  async createAttempt(userId) {
    const sql = `INSERT INTO attempts (user_id) VALUES (?)`;
    const [result] = await dbpool.query(sql, [userId]);
    return result.insertId; // attempt_id
  },

  async insertAttemptAnswers(attemptId, answers) {
    const values = answers.map((a) => [attemptId, a.quiz_id, a.answer]);

    const sql = `
    INSERT INTO attempt_answers (attempt_id, quiz_id, answer)
    VALUES ?
  `;

    const [result] = await dbpool.query(sql, [values]);
    return result;
  },

  async InsertAnswer(userId, answers) {
    const attemptId = await this.createAttempt(userId);

    await this.insertAttemptAnswers(attemptId, answers);

    return { attemptId };
  },

  async getAttemptScore(attemptId) {
    const sql = `
    SELECT 
      aa.quiz_id,
      aa.answer AS user_answer,
      q.correct_answer,
      CASE
        WHEN aa.answer = q.correct_answer THEN 1
        ELSE 0
      END AS score
    FROM attempt_answers aa
    JOIN quiz q ON aa.quiz_id = q.id
    WHERE aa.attempt_id = ?
  `;

    const [rows] = await dbpool.query(sql, [attemptId]);
    return rows;
  },

  async getAttemptTotalScore(attemptId) {
    const sql = `
    SELECT 
      SUM(CASE WHEN aa.answer = q.correct_answer THEN 1 ELSE 0 END) AS total_correct,
      COUNT(*) AS total_attempted
    FROM attempt_answers aa
    JOIN quiz q ON aa.quiz_id = q.id
    WHERE aa.attempt_id = ?
  `;

    const [rows] = await dbpool.query(sql, [attemptId]);
    return rows[0];
  },
};

module.exports = answerModel;
