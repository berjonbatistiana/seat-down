const router = require("express").Router();
const authMiddleware = require("../../../middlewares/authorizationMiddleware");
const {
  getAllUsersApi,
  getUserByIdApi,
  deleteUserByIdApi,
} = require("../../../controllers/userController");

router.use(authMiddleware);
router.route("/")
  .get(getAllUsersApi);
router.route("/:userId")
  .get(getUserByIdApi)
  .delete(deleteUserByIdApi);

module.exports = router;
