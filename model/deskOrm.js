const uniqid = require("uniqid");
const {
  findAllDesksQuery,
  findDeskByIdQuery,
  insertDeskQuery,
  deleteDeskByIdQuery,
} = require("./deskQueries");
const connection = require("../config/connection");

const fetchAllDesksFromDb = async () => {
  try {
    const [rows] = await connection.query(findAllDesksQuery);
    return rows;
  } catch (e) {
    throw new Error(e);
  }
};

const fetchDeskByIdFromDb = async (deskId) => {
  try {
    const [rows] = await connection.query(findDeskByIdQuery, deskId);
    return rows[0];
  } catch (e) {
    throw new Error(e);
  }
};

const insertDeskToDb = async (
  companyId,
  floor,
  building,
  name,
  chairCapacity
) => {
  const id = uniqid();
  try {
    await connection.query(insertDeskQuery, [
      id,
      companyId,
      floor,
      building,
      name,
      chairCapacity,
    ]);
    const [deskResult] = await connection.query(findDeskByIdQuery, id);
    return deskResult[0];
  } catch (e) {
    throw new Error(e);
  }
};

const deleteDeskByIdFromDb = async (deskId) => {
  try {
    const [rows] = await connection.query(findDeskByIdQuery, deskId);
    await connection.query(deleteDeskByIdQuery, deskId);
    return rows[0];
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  fetchAllDesksFromDb,
  fetchDeskByIdFromDb,
  insertDeskToDb,
  deleteDeskByIdFromDb,
};
