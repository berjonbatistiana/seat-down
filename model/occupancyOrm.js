const uniqid = require('uniqid');
const {
  findOccupancyByDateQuery,
  findOccupancyByIdQuery,
  insertOccupancyQuery,
  deleteOccupancyByIdQuery,
} = require("./occupancyQueries");
const connection = require("../config/connection");

const fetchAllOccupancyFromDb = async (date) => {
  try {
    const [rows] = await connection.query(findOccupancyByDateQuery, date);
    return rows;
  } catch (e) {
    throw new Error(e);
  }
};

const findOccupancyByIdFromDb = async (occupancyId) => {
  try {
    const [rows] = await connection.query(findOccupancyByIdQuery, occupancyId);
    return rows[0];
  } catch (e) {
    throw new Error(e);
  }
};

const insertOccupancyToDb = async (companyId, name, chairCapacity) => {
  try {
    const id = uniqid();
    const [result] = await connection.query(insertOccupancyQuery, [
      id,
      companyId,
      name,
      chairCapacity,
    ]);
    const [deskResult] = await connection.query(
      findOccupancyByIdFromDb,
      id
    );
    return deskResult[0];
  } catch (e) {
    throw new Error(e);
  }
};

const deleteOccupancyByIdFromDb = async (occupancyId) => {
  try {
    const [rows] = await connection.query(findOccupancyByIdQuery, occupancyId);
    await connection.query(deleteOccupancyByIdQuery, occupancyId);
    return rows[0];
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  fetchAllOccupancyFromDb,
  findOccupancyByIdFromDb,
  insertOccupancyToDb,
  deleteOccupancyByIdFromDb,
};
