const findAllChairsQuery = "SELECT * FROM chairs;";
const findChairByIdQuery = "SELECT * FROM chairs WHERE id = ?;";
const insertChairQuery = "INSERT INTO chairs (id, deskId, name) VALUES (?, ?, ?);";
const deleteChairByIdQuery = "DELETE FROM chairs WHERE ID = ?;";

module.exports = {
  findAllChairsQuery,
  findChairByIdQuery,
  insertChairQuery,
  deleteChairByIdQuery,
};
