const passport = require("passport");

const signInMiddleware = passport.authenticate(
  "local",
  { session: false },
  null
);

module.exports = signInMiddleware;
