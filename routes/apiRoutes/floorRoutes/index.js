const router = require("express").Router();
const {
  getAllFloorsApi,
  getFloorByIdApi,
  insertFloorApi,
  updateFloorCompanyByIdApi,
  deleteFloorByIdApi,
} = require("../../../controllers/floorController");

router.route("/").get(getAllFloorsApi).post(insertFloorApi).patch(updateFloorCompanyByIdApi);
router.route("/:floorId").get(getFloorByIdApi).delete(deleteFloorByIdApi);

module.exports = router;
