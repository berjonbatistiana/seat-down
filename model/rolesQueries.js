const findAllRolesQuery = `
  SELECT * FROM roles;
`;
const findRoleByIdQuery = `
  SELECT * FROM roles
  WHERE id = ?;
`;
const insertRoleQuery = `
  INSERT INTO roles (id, name)
  VALUES (?, ?);
`;
const deleteRoleByIdQuery = `
  DELETE FROM roles
  WHERE ID = ?;
`;

module.exports = {
  findAllRolesQuery,
  findRoleByIdQuery,
  insertRoleQuery,
  deleteRoleByIdQuery,
};
