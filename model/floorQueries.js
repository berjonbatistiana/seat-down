const findAllFloors = `
  SELECT *
  FROM floors;
  `;
const findFloorByIdQuery = `
  SELECT * FROM floors
  WHERE id = ?;
  `;
const insertFloorQuery = `
  INSERT INTO floors (id, companyId, buildingId, name, deskCapacity)
  VALUES (?, ?, ?, ?, ?);
  `;
const updateFloorCompanyQuery = `
  UPDATE floors
  SET companyId = ?
  WHERE id = ?
`;
const deleteFloorByIdQuery = `
  DELETE FROM floors
  WHERE ID = ?;
  `;

module.exports = {
  findAllFloors,
  findFloorByIdQuery,
  insertFloorQuery,
  updateFloorCompanyQuery,
  deleteFloorByIdQuery,
};
