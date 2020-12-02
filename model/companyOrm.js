const {
  findAllCompaniesQuery,
  findCompanyByIdQuery,
  insertCompanyQuery,
  deleteCompanyByIdQuery,
} = require("./companyQueries");
const connection = require("../config/connection");

const fetchAllCompaniesFromDb = async () => {
  try {
    const [rows] = await connection.query(findAllCompaniesQuery);
    return rows;
  } catch (e) {
    throw new Error(e);
  }
};

const fetchCompanyByIdFromDb = async (companyId) => {
  try {
    const [rows] = await connection.query(findCompanyByIdQuery, companyId);
    return rows[0];
  } catch (e) {
    throw new Error(e);
  }
};

const insertCompanyToDb = async (ownerId, name, deskCapacity, address) => {
  try {
    const [result] = await connection.query(insertCompanyQuery, [
      ownerId,
      name,
      deskCapacity,
      address,
    ]);
    const [companyResult] = await connection.query(
      findCompanyByIdQuery,
      result.insertId
    );
    return companyResult[0];
  } catch (e) {
    throw new Error(e);
  }
};

const deleteCompanyByIdFromDb = async (companyId) => {
  try {
    const [rows] = await connection.query(findCompanyByIdQuery, companyId);
    await connection.query(deleteCompanyByIdQuery, companyId);
    return rows[0];
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  fetchAllCompaniesFromDb,
  fetchCompanyByIdFromDb,
  insertCompanyToDb,
  deleteCompanyByIdFromDb,
};
