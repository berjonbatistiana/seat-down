const findAllChairsQuery = "SELECT * FROM chairs;";
const findChairByIdQuery = "SELECT * FROM chairs WHERE id = ?;";
const insertChairQuery = "INSERT INTO chairs (id, deskId, name) VALUES (?, ?, ?);";
const deleteChairByIdQuery = "DELETE FROM chairs WHERE ID = ?;";
const findAllAvailableChairsByCompanyQuery = `
  SELECT chairs.name AS chairName, companies.name AS companyName, chairs.id AS chairId
  FROM chairs
  JOIN desks
  ON chairs.deskId = desks.id
  JOIN floors
  ON floors.id = desks.floorId
  JOIN companies
  ON companies.id = floors.companyId
  WHERE chairs.id NOT IN (
    SELECT chairId
    FROM occupancy
  )
  AND companies.id = ?;
 `;

module.exports = {
  findAllChairsQuery,
  findChairByIdQuery,
  insertChairQuery,
  deleteChairByIdQuery,
  findAllAvailableChairsByCompanyQuery,
};
