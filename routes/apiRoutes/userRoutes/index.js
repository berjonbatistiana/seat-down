const router = require("express").Router();
const {
  getAllUsersApi,
  getUserByIdApi,
  getEmployeeDirectoryOnDateApi,
  getUserByUsernameApi,
  deleteUserByIdApi,
} = require("../../../controllers/userController");

router.route("/")
  .get(getAllUsersApi);
router.route("/:userId")
  .get(getUserByIdApi)
  .delete(deleteUserByIdApi);
router.route("/directory/:companyId/:date")
  .get(getEmployeeDirectoryOnDateApi)
router.route("/")
  .get(getAllUsersApi);
router.route("/username/:username")
  .get(getUserByUsernameApi);
module.exports = router;
