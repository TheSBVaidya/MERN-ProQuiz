const dbpool = require("../config/dbpool");

const userModel = {
  async registerUser(name, email, password) {
    const sql = `INSERT INTO user(name, email, password) VALUES (?, ?, ?)`;
    const [rows] = await dbpool.query(sql, [name, email, password]);

    if (rows.affectedRows === 1) {
      const id = rows.insertId;
      console.log(id);
      const userRow = await this.findUserById(id);
      console.log(userRow);
      return userRow;
    }

    return null;
  },

  async loginUser(email, password) {
    const sql = `SELECT id, name, email, password FROM user
                 WHERE email = ?`;

    const [userRow] = await dbpool.query(sql, [email]);
    const user = userRow[0];
    if (!user) return null;

    if (user.password === password) {
      const userData = await this.findUserById(user.id);
      return userData;
    }

    return null;
  },

  async findUserById(id) {
    const sql = `SELECT id, name, email FROM user WHERE id = ?`;
    const [userData] = await dbpool.query(sql, [id]);
    // console.log("GETUSERBYID: ", userData);
    return userData[0] || null;
  },

  async findUserByEmail(email) {
    const sql = `SELECT id, name, email FROM user WHERE email = ?`;
    const [user] = await dbpool.query(sql, [email]);
    return user[0] || null;
  },
};

module.exports = userModel;
