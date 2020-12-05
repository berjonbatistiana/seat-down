const router = require("express").Router();
const { signInApi, signUpApi, changePasswordApi } = require("../../controllers/authController");
const signInMiddleware = require("../../middlewares/signInMiddleware");

router.post("/signin", signInMiddleware, signInApi);
router.post("/signup", signUpApi);
router.patch("/changePassword", changePasswordApi);

module.exports = router;
