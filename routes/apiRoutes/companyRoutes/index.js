const router = require("express").Router();
const {
  getAllCompaniesApi,
  getCompanyByIdApi,
  insertCompanyApi,
  deleteCompanyByIdApi,
} = require("../../../controllers/companyController");

// matches /api/company/
router.route("/").get(getAllCompaniesApi).post(insertCompanyApi);
router.route("/:companyId").get(getCompanyByIdApi).delete(deleteCompanyByIdApi);

module.exports = router;
