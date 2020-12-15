const router = require("express").Router();
const {
  getAllUsersApi,
  getUserByIdApi,
  getUserByUsernameApi,
  deleteUserByIdApi,
} = require("../../../controllers/userController");

router.route("/").get(getAllUsersApi);
router.route("/:userId").get(getUserByIdApi).delete(deleteUserByIdApi);
router.route("/username/:username").get(getUserByUsernameApi);
module.exports = router;
