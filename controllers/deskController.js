const {
  fetchAllDesksFromDb,
  fetchDeskByIdFromDb,
  insertDeskToDb,
  deleteDeskByIdFromDb,
} = require("../model/deskOrm");

module.exports = {
  getAllDesksApi: async (_req, res) => {
    try {
      const desks = await fetchAllDesksFromDb();
      res.json(desks);
    } catch (e) {
      res.status(400).json(e);
    }
  },
  getDeskByIdApi: async (req, res) => {
    const { deskId } = req.params;
    try {
      res.json(await fetchDeskByIdFromDb(deskId));
    } catch (e) {
      res.status(400).json(e);
    }
  },
  insertDeskApi: async (req, res) => {
    const { companyId, floor, building, name, chairCapacity } = req.body;
    try {
      res.json(
        await insertDeskToDb(
          companyId,
          floor,
          building,
          name,
          parseInt(chairCapacity)
        )
      );
    } catch (e) {
      res.status(400).json(e);
    }
  },
  deleteDeskByIdApi: async (req, res) => {
    const { deskId } = req.params;
    try {
      const deletedDesk = await deleteDeskByIdFromDb(deskId);
      res.json(deletedDesk);
    } catch (e) {
      res.status(400).json(e);
    }
  },
};
