const {
  fetchUsers,
  fetchUserByIdFromDb,
  getEmployeeDirectoryOnDateFromDb,
  fetchUserByUsernameFromDb,
  deleteUserByIdFromDb,
} = require("../model/userOrm");

module.exports = {
  getAllUsersApi: async (req, res) => {
    try {
      const users = await fetchUsers();
      res.json(users);
    } catch (e) {
      res.status(400).json(e);
    }
  },
  getUserByUsernameApi: async (req, res) => {
    const { username } = req.params;
    try {
      const user = await fetchUserByUsernameFromDb(username);
      res.json(user);
    } catch (e) {
      res.status(400).json(e);
    }
  },
  getUserByIdApi: async (req, res) => {
    const { userId } = req.params;
    try {
      res.json(await fetchUserByIdFromDb(userId));
    } catch (e) {
      res.status(400).json(e);
    }
  },
  getEmployeeDirectoryOnDateApi: async (req, res) => {
    const { companyId, date } = req.params;
    try {
      res.json(await getEmployeeDirectoryOnDateFromDb(companyId, date));
    } catch(e){
      console.error(`API Error: Failed to get employee directory on ${date}.`)
      res.status(400).json(e);
    }
  },
  deleteUserByIdApi: async (req, res) => {
    const { userId } = req.params;
    if (userId !== req.user.id) {
      return res
        .status(401)
        .json({ error: "You cannot delete a user that is not yourself" });
    }
    try {
      const deletedUser = await deleteUserByIdFromDb(userId);
      res.json(deletedUser);
    } catch (e) {
      res.status(400).json(e);
    }
  },
};
