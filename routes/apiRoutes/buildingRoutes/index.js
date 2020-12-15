const router = require("express").Router();
const {
  getAllBuildingsApi,
  getBuildingByIdApi,
  insertBuildingApi,
  deleteBuildingApi,
} = require("../../../controllers/buildingController");

router.route("/").get(getAllBuildingsApi).post(insertBuildingApi);
router.route("/:chairId").get(getBuildingByIdApi).delete(deleteBuildingApi);

module.exports = router;
