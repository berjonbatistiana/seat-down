const {
  fetchAllRolesFromDb,
  findRoleByIdFromDb,
  insertRoleToDb,
  deleteRoleByIdFromDb,
} = require("../model/rolesOrm");

module.exports = {
  getAllRolesApi: async (_req, res) => {
    try {
      const roles = await fetchAllRolesFromDb();
      res.json(roles);
    } catch (e) {
      res.status(400).json(e);
    }
  },
  getRoleByIdApi: async (req, res) => {
    const { roleId } = req.params;
    try {
      res.json(await findRoleByIdFromDb(roleId));
    } catch (e) {
      res.status(400).json(e);
    }
  },
  insertRoleApi: async (req, res) => {
    const { name } = req.body;
    try {
      res.json(await insertRoleToDb(name));
    } catch (e) {
      res.status(400).json(e);
    }
  },
  deleteRoleByIdApi: async (req, res) => {
    const { roleId } = req.params;
    try {
      const deletedRole = await deleteRoleByIdFromDb(roleId);
      res.json(deletedRole);
    } catch (e) {
      res.status(400).json(e);
    }
  },
};
