const uniqid = require('uniqid');
const {
  findAllChairsQuery,
  findChairByIdQuery,
  insertChairQuery,
  deleteChairByIdQuery,
  findAllAvailableChairsByCompanyQuery
} = require("./chairQueries");
const connection = require("../config/connection");

const fetchAllChairsFromDb = async () => {
  try {
    const [rows] = await connection.query(findAllChairsQuery);
    return rows;
  } catch (e) {
    throw new Error(e);
  }
};

const fetchChairByIdFromDb = async (chairId) => {
  try {
    const [rows] = await connection.query(findChairByIdQuery, chairId);
    return rows[0];
  } catch (e) {
    throw new Error(e);
  }
};

const insertChairToDb = async (deskId, name) => {
  try {
    const id = uniqid();
    await connection.query(insertChairQuery, [id, deskId, name]);
    const [chairResult] = await connection.query(
      findChairByIdQuery,
      id
    );
    return chairResult[0];
  } catch (e) {
    throw new Error(e);
  }
};

const deleteChairByIdFromDb = async (chairId) => {
  try {
    const [rows] = await connection.query(findChairByIdQuery, chairId);
    await connection.query(deleteChairByIdQuery, chairId);
    return rows[0];
  } catch (e) {
    throw new Error(e);
  }
};

const findAllAvailableChairsByCompanyFromDb = async (companyId, date) => {
  try {
    const [rows] = await connection.query(findAllAvailableChairsByCompanyQuery, [date, companyId]);
    return rows;
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  fetchAllChairsFromDb,
  fetchChairByIdFromDb,
  insertChairToDb,
  deleteChairByIdFromDb,
  findAllAvailableChairsByCompanyFromDb,
};
