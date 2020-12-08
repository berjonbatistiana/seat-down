const uniqid = require('uniqid');
const {
  findAllBuildings,
  findBuildingByIdQuery,
  insertBuildingQuery,
  deleteBuildingByIdQuery,
} = require("./buildingQueries");
const connection = require("../config/connection");

const fetchAllBuildingsFromDb = async () => {
  try {
    const [rows] = await connection.query(findAllBuildings);
    return rows;
  } catch (e) {
    throw new Error(e);
  }
};

const fetchBuildingsByIdFromDb = async (buildingId) => {
  try {
    const [rows] = await connection.query(findBuildingByIdQuery, buildingId);
    return rows[0];
  } catch (e) {
    throw new Error(e);
  }
};

const insertBuildingToDb = async (address, name) => {
  try {
    const id = uniqid();
    await connection.query(insertBuildingQuery, [id, address, name]);
    const [buildingResult] = await connection.query(
      findBuildingByIdQuery,
      id
    );
    return buildingResult[0];
  } catch (e) {
    throw new Error(e);
  }
};

const deleteBuildingFromDb = async (buildingId) => {
  try {
    const [rows] = await connection.query(findBuildingByIdQuery, buildingId);
    await connection.query(deleteBuildingByIdQuery, buildingId);
    return rows[0];
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  fetchAllBuildingsFromDb,
  fetchBuildingsByIdFromDb,
  insertBuildingToDb,
  deleteBuildingFromDb,
};
