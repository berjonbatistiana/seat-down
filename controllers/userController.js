const {
  fetchUsers,
  getEmployeeDirectoryFromDb,
  fetchUserByUsernameFromDb,
  getUserInfoFromDb,
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
      console.error(`DB Error: Failed to get user by username`);
      res.status(400).json(e);
    }
  },
  getEmployeeDirectoryApi: async (req, res) => {
    const { companyId } = req.params;
    try {
      res.json(await getEmployeeDirectoryFromDb(companyId));
    } catch (e) {
      console.error(
        `DB Error: Failed to get employee directory on ${companyId}.\n ${e}`
      );
      res.status(400).json(e);
    }
  },
  getUserInfoFromApi: async (req, res) => {
    const { userId } = req.params;
    try {
      res.json(await getUserInfoFromDb(userId));
    } catch (e) {
      console.error(
        `DB Error: Failed to get user info from id: ${userId}\n${e}`
      );
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
