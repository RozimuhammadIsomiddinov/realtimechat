const pool = require("../../config/db");
const model = require("./model");

const getUsers = async () => {
  try {
    const { rows } = await pool.query(model.selectUsers);
    console.log(rows);
  } catch (err) {
    console.error("Error fetching users:", err.message);
  }
};

const createUser = async (id, name) => {
  try {
    const res = await pool.query(model.addUser, [id, name]);
    return res.rows;
  } catch (err) {
    console.error("Error adding users:", err.message);
  }
};
module.exports = { getUsers, createUser };
