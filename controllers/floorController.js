const {
  fetchAllFloorsFromDb,
  fetchFloorByIdFromDb,
  insertFloorToDb,
  updateFloorCompanyByIdFromDb,
  deleteFloorByIdFromDb,
} = require("../model/floorOrm");

module.exports = {
  getAllFloorsApi: async (_req, res) => {
    try {
      const floors = await fetchAllFloorsFromDb();
      res.json(floors);
    } catch (e) {
      console.error("DB Error: Could not fetch all Floors");
      res.status(400).json(e);
    }
  },
  getFloorByIdApi: async (req, res) => {
    const { floorId } = req.params;
    try {
      const floor = await fetchFloorByIdFromDb(floorId);
      res.json(floor);
    } catch (e) {
      console.error("DB Error: Could not find floor with id: " + floorId);
      res.status(400).json(e);
    }
  },
  insertFloorApi: async (req, res) => {
    const { companyId, buildingId, name, deskCapacity } = req.body;
    try {
      res.json(
        await insertFloorToDb(
          companyId,
          buildingId,
          name,
          parseInt(deskCapacity)
        )
      );
    } catch (e) {
      console.error(
        `DB Error: Could not insert new floor: {${companyId}, ${buildingId}, ${name}, ${deskCapacity}`
      );
      res.status(400).json(e);
    }
  },

  updateFloorCompanyByIdApi: async (req, res) => {
    const { floorId, companyId } = req.body;
    try {
      const updatedFloor = await updateFloorCompanyByIdFromDb(
        floorId,
        companyId
      );
      res.json(updatedFloor);
    } catch (e) {
      console.error(
        `DB Error: Could not update floor: ${floorId} with company: ${companyId}.`
      );
      res.status(400).json(e);
    }
  },

  deleteFloorByIdApi: async (req, res) => {
    const { floorId } = req.params;
    try {
      const deletedFloor = await deleteFloorByIdFromDb(floorId);
      res.json(deletedFloor);
    } catch (e) {
      console.error(`DB Error: Could not delete floor: ${floorId}`);
      res.status(400).json(e);
    }
  },
};
