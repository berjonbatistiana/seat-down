const findAllUsers = `
  SELECT id, username
  FROM users;
  `;
const findUserByIdQuery = `
  SELECT id, username, password, roleId, companyId FROM users
  WHERE id = ?;
  `;
const findUserByUsername = `
  SELECT id, username, password
  FROM users
  WHERE username = ?;
  `;
const insertUserQuery = `
  INSERT INTO users (id, username, password, roleId, companyId)
  VALUES (?, ?, ?, ?, ?);
  `;
const updateUserPasswordQuery = `
  UPDATE users
  SET password = ?
  WHERE id = ?
`;
const deleteUserByIdQuery = `
  DELETE FROM users
  WHERE ID = ?;
  `;

module.exports = {
  findAllUsers,
  findUserByIdQuery,
  findUserByUsername,
  insertUserQuery,
  updateUserPasswordQuery,
  deleteUserByIdQuery,
};
