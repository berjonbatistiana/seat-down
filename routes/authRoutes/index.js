const router = require("express").Router();
const { signInApi, signUpApi } = require("../../controllers/authController");
const signInMiddleware = require("../../middlewares/signInMiddleware");

router.post("/signin", signInMiddleware, signInApi);
router.post("/signup", signUpApi);

module.exports = router;
