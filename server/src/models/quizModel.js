const dbpool = require("../config/dbpool");

const QuizModel = {
  async findAllPaginated(limit, offset) {
    const sql = `SELECT q.id, q.question, q.a, q.b, q.c, q.d
                  FROM quiz q
                  ORDER BY RAND()
                  LIMIT ?`;
    const [rows] = await dbpool.query(sql, [limit, offset]);

    //fetch total count
    const sqlCount = `SELECT COUNT(*) as 'total' FROM quiz`;
    const [countRows] = await dbpool.query(sqlCount);
    // console.log(countRows);
    const total = countRows[0].total;

    return { rows, total };
  },

  async findById(id) {
    const sql = `SELECT q.id, q.question, q.a, q.b, q.c, q.d FROM quiz q
                 WHERE q.id = ?`;
    const [rows] = await dbpool.query(sql, id);
    return rows[0];
  },
};

module.exports = QuizModel;
