const router = require("express").Router();
const {
  getAllChairsApi,
  getChairByIdApi,
  insertChairApi,
  deleteChairByIdApi,
} = require("../../../controllers/chairController");

router.route("/").get(getAllChairsApi).post(insertChairApi);
router.route("/:chairId").get(getChairByIdApi).delete(deleteChairByIdApi);

module.exports = router;
