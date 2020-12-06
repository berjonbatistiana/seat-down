const {
  fetchAllBuildingsFromDb,
  fetchBuildingsByIdFromDb,
  insertBuildingToDb,
  deleteBuildingFromDb,
} = require("../model/buildingOrm");

module.exports = {
  getAllBuildingsApi: async (_req, res) => {
    try {
      const bldg = await fetchAllBuildingsFromDb();
      res.json(bldg);
    } catch (e) {
      res.status(400).json(e);
    }
  },
  getBuildingByIdApi: async (req, res) => {
    const { buildingId } = req.params;
    try {
      res.json(await fetchBuildingsByIdFromDb(buildingId));
    } catch (e) {
      res.status(400).json(e);
    }
  },
  insertBuildingApi: async (req, res) => {
    const { address, name } = req.body;
    try {
      res.json(await insertBuildingToDb(address, name));
    } catch (e) {
      res.status(400).json(e);
    }
  },
  deleteBuildingApi: async (req, res) => {
    const { buildingId } = req.params;
    try {
      const deletedBuilding = await deleteBuildingFromDb(buildingId);
      res.json(deletedBuilding);
    } catch (e) {
      res.status(400).json(e);
    }
  },
};
