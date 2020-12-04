const findAllDesksQuery = "SELECT * FROM desk;";
const findDeskByIdQuery = "SELECT * FROM desk WHERE id = ?;";
const insertDeskQuery =
  "INSERT INTO desk (id, companyId, name, chairCapacity) VALUES (?, ?, ?, ?);";
const deleteDeskByIdQuery = "DELETE FROM desk WHERE ID = ?;";

module.exports = {
  findAllDesksQuery,
  findDeskByIdQuery,
  insertDeskQuery,
  deleteDeskByIdQuery,
};
