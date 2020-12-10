const router = require("express").Router();
const {
  getAllChairsApi,
  getChairByIdApi,
  insertChairApi,
  deleteChairByIdApi,
  getAllAvailableChairByCompanyIdApi
} = require("../../../controllers/chairController");

router.route("/").get(getAllChairsApi).post(insertChairApi);
router.route("/available/:companyId/:date").get(getAllAvailableChairByCompanyIdApi);
router.route("/:chairId").get(getChairByIdApi).delete(deleteChairByIdApi);

module.exports = router;
