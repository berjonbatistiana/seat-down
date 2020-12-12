const findOccupancyByDateQuery = `
  SELECT * FROM occupancy
  WHERE occupancyDate = ?;
`;
const findOccupancyByIdQuery = `
  SELECT * FROM occupancy
  WHERE id = ?;
`;
const insertOccupancyQuery = `
  INSERT INTO occupancy (id, occupancyDate, chairId, userId)
  VALUES (?, ?, ?, ?);
`;
const doesUserHaveSeatOnDateQuery = `
 SELECT * FROM occupancy
 WHERE occupancyDate = ?
 AND userId = ?;
`;
const deleteOccupancyByIdQuery = `
  DELETE FROM occupancy
  WHERE ID = ?;
`;

module.exports = {
  findOccupancyByDateQuery,
  findOccupancyByIdQuery,
  insertOccupancyQuery,
  doesUserHaveSeatOnDateQuery,
  deleteOccupancyByIdQuery,
};
