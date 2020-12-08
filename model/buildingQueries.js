const findAllBuildings = `
  SELECT *
  FROM buildings;
  `;
const findBuildingByIdQuery = `
  SELECT * FROM buildings
  WHERE id = ?;
  `;
const insertBuildingQuery = `
  INSERT INTO buildings (id, address, name)
  VALUES (?, ?, ?);
  `;
const deleteBuildingByIdQuery = `
  DELETE FROM buildings
  WHERE ID = ?;
  `;

module.exports = {
  findAllBuildings,
  findBuildingByIdQuery,
  insertBuildingQuery,
  deleteBuildingByIdQuery,
};
