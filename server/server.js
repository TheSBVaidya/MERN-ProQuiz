require("dotenv").config();
const app = require("./src/app");
const pool = require("./src/config/dbpool");

const port = process.env.PORT || 3000;

async function start() {
  try {
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();
    console.log("Mysql pool created and ping OK");

    app.listen(port, () => {
      console.log(`server start on port ${port}`);
    });
  } catch (error) {
    console.error(`Failed to start server: `, error);
    process.exit(1);
  }
}

start();
