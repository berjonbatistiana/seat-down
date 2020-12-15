const router = require("express").Router();
const {
  getAllOccupancyApi,
  getAllOccupancyByEmployeeIdApi,
  getOccupyByIdApi,
  insertOccupancyApi,
  doesUserHaveSeatOnDateApi,
  deleteOccupancyByIdApi,
} = require("../../../controllers/occupancyController");

router.route("/").get(getAllOccupancyApi).post(insertOccupancyApi);
router.route("/hasSeat/:userId/:date").get(doesUserHaveSeatOnDateApi);
router
  .route("/:occupancyId")
  .get(getOccupyByIdApi)
  .delete(deleteOccupancyByIdApi);
router.route("/employee/:employeeId").get(getAllOccupancyByEmployeeIdApi);

module.exports = router;
