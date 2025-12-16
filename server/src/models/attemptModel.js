const dbpool = require("../config/dbpool");

const attemptModel = {
  async getAttemptsByUser(userId) {
    const sql = `
      SELECT attempt_id, user_id, created_at
      FROM attempts
      WHERE user_id = ?
      ORDER BY attempt_id DESC
    `;
    const [rows] = await dbpool.query(sql, [userId]);
    return rows;
  },

  async getAttemptDetails(attemptId) {
    const sql = `
      SELECT 
        q.id AS quiz_id,
        q.question,
        q.a, q.b, q.c, q.d,
        aa.answer AS user_answer,
        q.correct_answer,
        CASE WHEN aa.answer = q.correct_answer THEN 1 ELSE 0 END AS score
      FROM attempt_answers aa
      JOIN quiz q ON aa.quiz_id = q.id
      WHERE aa.attempt_id = ?
    `;
    const [rows] = await dbpool.query(sql, [attemptId]);
    return rows;
  },

  async getAttemptSummary(attemptId) {
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

module.exports = attemptModel;
