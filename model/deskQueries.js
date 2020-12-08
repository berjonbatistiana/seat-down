const findAllDesksQuery = "SELECT * FROM desks;";
const findDeskByIdQuery = "SELECT * FROM desks WHERE id = ?;";
const insertDeskQuery =
  "INSERT INTO desks (id, floorId, name, chairCapacity) VALUES (?, ?, ?, ?);";
const deleteDeskByIdQuery = "DELETE FROM desks WHERE ID = ?;";

module.exports = {
  findAllDesksQuery,
  findDeskByIdQuery,
  insertDeskQuery,
  deleteDeskByIdQuery,
};
