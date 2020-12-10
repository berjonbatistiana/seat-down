const {
  fetchAllOccupancyFromDb,
  findOccupancyByIdFromDb,
  insertOccupancyToDb,
  deleteOccupancyByIdFromDb,
} = require("../model/occupancyOrm");

module.exports = {
  getAllOccupancyApi: async (req, res) => {
    const { date } = req.query;
    try {
      const occupancies = await fetchAllOccupancyFromDb(date);
      res.json(occupancies);
    } catch (e) {
      res.status(400).json(e);
    }
  },
  getOccupyByIdApi: async (req, res) => {
    const { roleId } = req.params;
    try {
      res.json(await findOccupancyByIdFromDb(roleId));
    } catch (e) {
      res.status(400).json(e);
    }
  },
  insertOccupancyApi: async (req, res) => {
    const { date, chairId, userId } = req.body;
    try {
      res.json(await insertOccupancyToDb(date, chairId, userId));
    } catch (e) {
      res.status(400).json(e);
    }
  },
  deleteOccupancyByIdApi: async (req, res) => {
    const { occupancyId } = req.params;
    try {
      const deletedOccupancy = await deleteOccupancyByIdFromDb(occupancyId);
      res.json(deletedOccupancy);
    } catch (e) {
      res.status(400).json(e);
    }
  },
};
