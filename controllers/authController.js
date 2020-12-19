const jwt = require("jsonwebtoken");
const { insertUserToDb, updatePasswordFromDb } = require("../model/userOrm");

const tokenForUser = (id) => {
  return jwt.sign(
    {
      sub: id,
      iat: new Date().getTime(),
    },
    process.env.JWT_SECRET
  );
};

module.exports = {
  signInApi: (req, res) => {
    res.json(tokenForUser(req.user.id));
    console.log(req.user.id);
  },
  signUpApi: async (req, res) => {
    const { username, password, roleId, companyId } = req.body;
    try {
      const user = await insertUserToDb(username, password, roleId, companyId);
      res.json(tokenForUser(user.id));
    } catch (e) {
      res.status(400).json(e);
    }
  },
  changePasswordApi: async (req, res) => {
    const { password, newPassword } = req.body;
    try {
      const user = await updatePasswordFromDb(
        req.user.id,
        password,
        newPassword
      );
      res.json(user);
    } catch (e) {
      res.status(400).json(e);
    }
  },
};
