const findAllChairsQuery = "SELECT * FROM chairs;";
const findChairByIdQuery = "SELECT * FROM chairs WHERE id = ?;";
const insertChairQuery =
  "INSERT INTO chairs (id, deskId, name) VALUES (?, ?, ?);";
const deleteChairByIdQuery = "DELETE FROM chairs WHERE ID = ?;";
const getChairLocationQuery = `
  SELECT
    buildings.name AS buildingName,
    floors.name AS floorName,
    desks.name AS deskName,
    chairs.name AS chairName from chairs
  JOIN desks
  ON chairs.deskId = desks.id
  JOIN floors
  ON desks.floorId = floors.id
  JOIN buildings
  ON floors.buildingId = buildings.id
  WHERE chairs.id = ?;
`;
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
    WHERE occupancyDate = ?
  ) AND companies.id = ?;
 `;

module.exports = {
  findAllChairsQuery,
  findChairByIdQuery,
  insertChairQuery,
  deleteChairByIdQuery,
  getChairLocationQuery,
  findAllAvailableChairsByCompanyQuery,
};
