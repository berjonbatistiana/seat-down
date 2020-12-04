const uniqid = require('uniqid');
const {
  findAllRolesQuery,
  findRoleByIdQuery,
  insertRoleQuery,
  deleteRoleByIdQuery,
} = require("./rolesQueries");
const connection = require("../config/connection");

const fetchAllRolesFromDb = async () => {
  try {
    const [rows] = await connection.query(findAllRolesQuery);
    return rows;
  } catch (e) {
    throw new Error(e);
  }
};

const findRoleByIdFromDb = async (roleId) => {
  try {
    const [rows] = await connection.query(findRoleByIdQuery, roleId);
    return rows[0];
  } catch (e) {
    throw new Error(e);
  }
};

const insertRoleToDb = async (name) => {
  try {
    const id = uniqid();
    await connection.query(insertRoleQuery, [
      id,
      name,
    ]);
    const [occupancyResult] = await connection.query(
      findRoleByIdFromDb,
      id
    );
    return occupancyResult[0];
  } catch (e) {
    throw new Error(e);
  }
};

const deleteRoleByIdFromDb = async (roleId) => {
  try {
    const [rows] = await connection.query(deleteRoleByIdQuery, roleId);
    await connection.query(deleteRoleByIdQuery, roleId);
    return rows[0];
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  fetchAllRolesFromDb,
  findRoleByIdFromDb,
  insertRoleToDb,
  deleteRoleByIdFromDb,
};
