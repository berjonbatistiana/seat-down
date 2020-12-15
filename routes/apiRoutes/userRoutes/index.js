const router = require("express").Router();
const {
  getAllUsersApi,
  getUserByIdApi,
  getEmployeeDirectoryOnDateApi,
  deleteUserByIdApi,
} = require("../../../controllers/userController");

router.route("/")
  .get(getAllUsersApi);
router.route("/:userId")
  .get(getUserByIdApi)
  .delete(deleteUserByIdApi);
router.route("/directory/:companyId/:date")
  .get(getEmployeeDirectoryOnDateApi)
module.exports = router;
