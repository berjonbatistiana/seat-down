const router = require("express").Router();
const {
  getAllUsersApi,
  getEmployeeDirectoryApi,
  getUserByUsernameApi,
  deleteUserByIdApi,
} = require("../../../controllers/userController");

// Matches api/users/
router.route("/")
  .get(getAllUsersApi);
router.route("/:userId")
  .delete(deleteUserByIdApi);
router.route("/directory/:companyId/")
  .get(getEmployeeDirectoryApi)
router.route("/")
  .get(getAllUsersApi);
router.route("/username/:username")
  .get(getUserByUsernameApi);
module.exports = router;
