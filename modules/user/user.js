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
    return res.rows[0];
  } catch (err) {
    console.error("Error adding users:", err.message);
  }
};

const removeUser = async (id) => {
  try {
    const res = await pool.query(model.deleteUser, [id]);
    return res.rows[0];
  } catch (err) {
    console.error("Error deleting user:", err.message);
  }
};
module.exports = { getUsers, createUser, removeUser };
