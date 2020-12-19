const findAllCompaniesQuery = "SELECT * FROM companies;";
const findCompanyByIdQuery = "SELECT * FROM companies WHERE id = ?;";
const insertCompanyQuery =
  "INSERT INTO companies (id, name) VALUES (?, ?);";
const deleteCompanyByIdQuery = "DELETE FROM companies WHERE ID = ?;";

module.exports = {
  findAllCompaniesQuery,
  findCompanyByIdQuery,
  insertCompanyQuery,
  deleteCompanyByIdQuery,
};
