const {
  fetchAllCompaniesFromDb,
  fetchCompanyByIdFromDb,
  insertCompanyToDb,
  deleteCompanyByIdFromDb,
} = require("../model/companyOrm");

module.exports = {
  getAllCompaniesApi: async (_req, res) => {
    try {
      const companies = await fetchAllCompaniesFromDb();
      res.json(companies);
    } catch (e) {
      res.status(400).json(e);
    }
  },
  getCompanyByIdApi: async (req, res) => {
    const { companyId } = req.params;
    try {
      res.json(await fetchCompanyByIdFromDb(companyId));
    } catch (e) {
      res.status(400).json(e);
    }
  },
  insertCompanyApi: async (req, res) => {
    const { ownerId, name, deskCapacity, address } = req.body;
    try {
      res.json(await insertCompanyToDb(ownerId, name, deskCapacity, address));
    } catch (e) {
      res.status(400).json(e);
    }
  },
  deleteCompanyByIdApi: async (req, res) => {
    const { companyId } = req.params;
    try {
      const deletedCompany = await deleteCompanyByIdFromDb(companyId);
      res.json(deletedCompany);
    } catch (e) {
      res.status(400).json(e);
    }
  },
};
