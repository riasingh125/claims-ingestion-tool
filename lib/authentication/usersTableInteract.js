const pool = require("../config/db");

exports.findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};

exports.createUser = async (email, passwordHash) => {
  const result = await pool.query(
    "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *",
    [email, passwordHash],
  );
  return result.rows[0];
};
