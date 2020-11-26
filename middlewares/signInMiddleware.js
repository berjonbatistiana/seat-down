const passport = require("passport");

const signInMiddleware = passport.authenticate("local", { session: false });

module.exports = signInMiddleware;
