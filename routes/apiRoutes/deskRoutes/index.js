const router = require("express").Router();
const {
  getAllDesksApi,
  getDeskByIdApi,
  insertDeskApi,
  deleteDeskByIdApi,
} = require("../../../controllers/deskController");

router.route("/").get(getAllDesksApi).post(insertDeskApi);
router.route("/:deskId").get(getDeskByIdApi).delete(deleteDeskByIdApi);

module.exports = router;
