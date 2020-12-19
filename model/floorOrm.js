const uniqid = require("uniqid");
const {
  findAllFloors,
  findFloorByIdQuery,
  insertFloorQuery,
  updateFloorCompanyQuery,
  deleteFloorByIdQuery,
} = require("./floorQueries");
const connection = require("../config/connection");

const fetchAllFloorsFromDB = async () => {
  try {
    const [rows] = await connection.query(findAllFloors);
    return rows;
  } catch (e) {
    throw new Error(e);
  }
};

const fetchFloorByIdFromDb = async (floorId) => {
  try {
    const [rows] = await connection.query(findFloorByIdQuery, floorId);
    return rows[0];
  } catch (e) {
    throw new Error(e);
  }
};

const insertFloorToDb = async (companyId, buildingId, name, deskCapacity) => {
  const id = uniqid();
  try {
    await connection.query(insertFloorQuery, [
      id,
      companyId,
      buildingId,
      name,
      deskCapacity,
    ]);
    const [floorResult] = await connection.query(findFloorByIdQuery, id);
    return floorResult[0];
  } catch (e) {
    throw new Error(e);
  }
};

const updateFloorCompanyByIdFromDB = async (floorId, companyId) => {
  try {
    await connection.query(updateFloorCompanyQuery, [companyId, floorId]);
    const [floorResult] = await connection.query(findFloorByIdQuery, floorId);
    return floorResult[0];
  } catch (e) {
    console.error("Error updating company from floor.");
    throw new Error(e);
  }
};

const deleteFloorByIdFromDB = async (floorId) => {
  try {
    const [rows] = await connection.query(findFloorByIdQuery, floorId);
    await connection.query(deleteFloorByIdQuery, floorId);
    return rows[0];
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  fetchAllFloorsFromDB,
  fetchFloorByIdFromDb,
  insertFloorToDb,
  updateFloorCompanyByIdFromDB,
  deleteFloorByIdFromDB,
};
