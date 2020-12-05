const router = require("express").Router();
const {
  getAllOccupancyApi,
  getOccupyByIdApi,
  insertOccupancyApi,
  deleteOccupancyByIdApi,
} = require("../../../controllers/occupancyController");

router.route("/")
  .get(getAllOccupancyApi)
  .post(insertOccupancyApi);
router.route("/:occupancyId")
  .get(getOccupyByIdApi)
  .delete(deleteOccupancyByIdApi);

module.exports = router;
