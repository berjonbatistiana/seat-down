const findAllDesksQueries = "SELECT * FROM desk;";
const findDeskByIdQuery = "SELECT * FROM desk WHERE id = ?;";
const insertDeskQuery =
  "INSERT INTO desk (companyId, name, chairCapacity) VALUES (?, ?, ?);";
const deleteDeskByIdQuery = "DELETE FROM desk WHERE ID = ?;";

module.exports = {
  findAllDesksQueries,
  findDeskByIdQuery,
  insertDeskQuery,
  deleteDeskByIdQuery,
};
