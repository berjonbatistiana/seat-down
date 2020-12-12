const findOccupancyByDateQuery = `
  SELECT * FROM occupancy
  WHERE occupancyDate = ?;
`;

const findOccupancyByEmployeeIdQuery = `
  SELECT * FROM occupancy
  WHERE userId = ?;
`;

const findOccupancyByIdQuery = `
  SELECT * FROM occupancy
  WHERE id = ?;
`;
const insertOccupancyQuery = `
  INSERT INTO occupancy (id, occupancyDate, chairId, userId)
  VALUES (?, ?, ?, ?);
`;
const deleteOccupancyByIdQuery = `
  DELETE FROM occupancy
  WHERE ID = ?;
`;

module.exports = {
  findOccupancyByDateQuery,
  findOccupancyByEmployeeIdQuery,
  findOccupancyByIdQuery,
  insertOccupancyQuery,
  deleteOccupancyByIdQuery,
};
