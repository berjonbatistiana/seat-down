const {
  fetchAllChairsFromDb,
  fetchChairByIdFromDb,
  insertChairToDb,
  deleteChairByIdFromDb,
  findAllAvailableChairsByCompanyFromDb,
} = require("../model/chairOrm");

module.exports = {
  getAllChairsApi: async (_req, res) => {
    try {
      const chairs = await fetchAllChairsFromDb();
      res.json(chairs);
    } catch (e) {
      res.status(400).json(e);
    }
  },
  getChairByIdApi: async (req, res) => {
    const { chairId } = req.params;
    try {
      res.json(await fetchChairByIdFromDb(chairId));
    } catch (e) {
      res.status(400).json(e);
    }
  },
  getAllAvailableChairByCompanyIdApi: async (req, res) => {
    const { companyId, date } = req.params;
    try{
      res.json(await findAllAvailableChairsByCompanyFromDb(companyId, date))
    } catch (e){
      console.log(`API Error: Failed to find all available chairs by company id: ${companyId} on: ${date} \n ${e}`);
      res.status(400).json(e);
    }
  },
  insertChairApi: async (req, res) => {
    const { deskId, name } = req.body;
    try {
      res.json(await insertChairToDb(deskId, name));
    } catch (e) {
      res.status(400).json(e);
    }
  },
  deleteChairByIdApi: async (req, res) => {
    const { chairId } = req.params;
    try {
      const deletedChair = await deleteChairByIdFromDb(chairId);
      res.json(deletedChair);
    } catch (e) {
      res.status(400).json(e);
    }
  },
};
