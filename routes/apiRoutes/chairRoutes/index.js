const router = require("express").Router();
const {
  getAllChairsApi,
  getChairByIdApi,
  insertChairApi,
  deleteChairByIdApi,
  getChairLocationApi,
  getAllAvailableChairByCompanyIdApi
} = require("../../../controllers/chairController");

// Matches api/chairs
router.route("/").get(getAllChairsApi).post(insertChairApi);
router.route("/available/:companyId/:date").get(getAllAvailableChairByCompanyIdApi);
router.route("/:chairId")
  .get(getChairByIdApi)
  .delete(deleteChairByIdApi);
router.route("/location/:chairId")
  .get(getChairLocationApi)

module.exports = router;
