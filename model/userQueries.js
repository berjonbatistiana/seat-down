const findAllUsers = `
  SELECT id, username
  FROM users;
  `;
const findUserByIdQuery = `
  SELECT id, username, password FROM users
  WHERE id = ?;
  `;
const findUserByUsername = `
  SELECT id, username, password
  FROM users
  WHERE username = ?;
  `;

const getEmployeeDirectoryOnDate = `
  SELECT
    username,
    roles.name AS role,
    chairs.name AS chairName,
    floors.name AS floorName,
    buildings.name AS buildingName
  FROM users
  JOIN roles
  ON users.roleId = roles.id
  LEFT JOIN occupancy
  ON users.id = occupancy.userId
  LEFT JOIN chairs
  ON occupancy.chairId = chairs.id
  LEFT JOIN desks
  ON desks.id = chairs.deskId
  LEFT JOIN floors
  ON floors.id = desks.floorId
  LEFT JOIN buildings
  ON floors.buildingId = buildings.id
  WHERE users.companyId = ?
  AND (
    occupancy.occupancyDate = ? OR
    occupancy.occupancyDate IS NULL
  );
`
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
  getEmployeeDirectoryOnDate,
  insertUserQuery,
  updateUserPasswordQuery,
  deleteUserByIdQuery,
};
