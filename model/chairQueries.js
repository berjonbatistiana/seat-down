const findAllChairsQuery = "SELECT * FROM chairs;";
const findChairByIdQuery = "SELECT * FROM chairs WHERE id = ?;";
const insertChairQuery = "INSERT INTO chairs (id, deskId, name) VALUES (?, ?, ?);";
const deleteChairByIdQuery = "DELETE FROM chairs WHERE ID = ?;";
const findAllAvailableChairsByCompanyQuery = `
  SELECT
    companies.name AS companyName,
    buildings.id AS buildingId,
    buildings.name AS buildingName,
    floors.id AS floorId,
    floors.name AS floorName,
    chairs.id AS chairId,
    chairs.name AS chairName
  FROM chairs
  JOIN desks
  ON desks.id = chairs.deskId
  JOIN floors
  ON floors.id = desks.floorId
  JOIN companies
  ON companies.id = floors.companyId
  JOIN buildings
  ON buildings.id = floors.buildingId
  WHERE chairs.id NOT IN (
    SELECT chairId
    FROM occupancy
  ) AND companies.id = ?;
 `;

module.exports = {
  findAllChairsQuery,
  findChairByIdQuery,
  insertChairQuery,
  deleteChairByIdQuery,
  findAllAvailableChairsByCompanyQuery,
};
