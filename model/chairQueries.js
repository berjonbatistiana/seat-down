const findAllChairsQuery = "SELECT * FROM chair;";
const findChairByIdQuery = "SELECT * FROM chair WHERE id = ?;";
const insertChairQuery = "INSERT INTO chair (id, deskId, name) VALUES (?, ?, ?);";
const deleteChairByIdQuery = "DELETE FROM chair WHERE ID = ?;";

module.exports = {
  findAllChairsQuery,
  findChairByIdQuery,
  insertChairQuery,
  deleteChairByIdQuery,
};
