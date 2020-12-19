const router = require("express").Router();
const {
  signInApi,
  signUpApi,
  changePasswordApi,
} = require("../../controllers/authController");
const signInMiddleware = require("../../middlewares/signInMiddleware");

// Matches /auth
router.post("/signin", signInMiddleware, signInApi);
router.post("/signup", signUpApi);

module.exports = router;
