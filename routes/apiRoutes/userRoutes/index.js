const router = require("express").Router();
const {
  getAllUsersApi,
  getEmployeeDirectoryApi,
  getUserByUsernameApi,
  getUserInfoFromApi,
  deleteUserByIdApi,
  changePasswordApi
} = require("../../../controllers/userController");

// Matches api/users/
router.route("/").get(getAllUsersApi);
router.route("/:userId").get(getUserInfoFromApi).delete(deleteUserByIdApi);
router.route("/directory/:companyId/").get(getEmployeeDirectoryApi);
router.route("/username/:username").get(getUserByUsernameApi);
router.route("/changePassword").patch(changePasswordApi);

module.exports = router;
