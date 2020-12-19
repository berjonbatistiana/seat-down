const router = require("express").Router();
const {
  getAllRolesApi,
  getRoleByIdApi,
  insertRoleApi,
  deleteRoleByIdApi,
} = require("../../../controllers/roleController");

router.route("/").get(getAllRolesApi).post(insertRoleApi);
router.route("/:roleId").get(getRoleByIdApi).delete(deleteRoleByIdApi);

module.exports = router;
