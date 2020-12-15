const uniqid = require("uniqid");
const {
  findOccupancyByDateQuery,
  findOccupancyByEmployeeIdQuery,
  findOccupancyByIdQuery,
  insertOccupancyQuery,
  doesUserHaveSeatOnDateQuery,
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

const fetchAllOccupancyByEmployeeIdFromDb = async (employeeId) => {
  try {
    const [rows] = await connection.query(
      findOccupancyByEmployeeIdQuery,
      employeeId
    );
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

const insertOccupancyToDb = async (date, chairId, userId) => {
  try {
    const id = uniqid();
    await connection.query(insertOccupancyQuery, [id, date, chairId, userId]);
    const [occupancyResult] = await connection.query(
      findOccupancyByIdQuery,
      id
    );
    return occupancyResult[0];
  } catch (e) {
    throw new Error(e);
  }
};

const doesUserHaveSeatOnDateFromDb = async (date, userId) => {
  try{
    const [rows] = await connection.query(doesUserHaveSeatOnDateQuery, [date, userId]);
    return rows[0]
  } catch (e) {
    throw new Error(e);
  }
}

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
  fetchAllOccupancyByEmployeeIdFromDb,
  findOccupancyByIdFromDb,
  insertOccupancyToDb,
  doesUserHaveSeatOnDateFromDb,
  deleteOccupancyByIdFromDb,
};
