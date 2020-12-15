const router = require("express").Router();
const {
  getAllUsersApi,
  getEmployeeDirectoryOnDateApi,
  getUserByUsernameApi,
  deleteUserByIdApi,
} = require("../../../controllers/userController");

// Matches api/users/
router.route("/")
  .get(getAllUsersApi);
router.route("/:userId")
  .delete(deleteUserByIdApi);
router.route("/directory/:companyId/:date")
  .get(getEmployeeDirectoryOnDateApi)
router.route("/")
  .get(getAllUsersApi);
router.route("/username/:username")
  .get(getUserByUsernameApi);
module.exports = router;
