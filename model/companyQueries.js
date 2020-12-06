const findAllCompaniesQuery = "SELECT * FROM company;";
const findCompanyByIdQuery = "SELECT * FROM company WHERE id = ?;";
const insertCompanyQuery =
  "INSERT INTO company (id, name) VALUES (?, ?);";
const deleteCompanyByIdQuery = "DELETE FROM company WHERE ID = ?;";

module.exports = {
  findAllCompaniesQuery,
  findCompanyByIdQuery,
  insertCompanyQuery,
  deleteCompanyByIdQuery,
};
