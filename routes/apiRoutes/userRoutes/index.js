const router = require("express").Router();
const {
  getAllUsersApi,
  getEmployeeDirectoryApi,
  getUserByUsernameApi,
  getUserInfoFromApi,
  deleteUserByIdApi,
} = require("../../../controllers/userController");

router.route("/").get(getAllUsersApi);
router.route("/:userId").get(getUserInfoFromApi).delete(deleteUserByIdApi);
router.route("/directory/:companyId/").get(getEmployeeDirectoryApi);
router.route("/username/:username").get(getUserByUsernameApi);
module.exports = router;
