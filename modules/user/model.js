const pool = require("../../config/db");

const selectUsers = `
        SELECT *FROM users;
`;

const addUser = `
        INSERT INTO users (id,name)
        VALUES ($1,$2)
        RETURNING *;

`;
module.exports = {
  selectUsers,
  addUser,
};
