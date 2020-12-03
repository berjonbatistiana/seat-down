const findAllRolesQuery = `
  SELECT * FROM Role;
`;
const findRoleByIdQuery = `
  SELECT * FROM Role
  WHERE id = ?;
`;
const insertRoleQuery = `
  INSERT INTO Role (id, name)
  VALUES (?, ?);
`;
const deleteRoleByIdQuery = `
  DELETE FROM Role
  WHERE ID = ?;
`;

module.exports = {
  findAllRolesQuery,
  findRoleByIdQuery,
  insertRoleQuery,
  deleteRoleByIdQuery,
};
