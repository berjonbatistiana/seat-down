const router = require("express").Router();
const authMiddleware = require("../../middlewares/authorizationMiddleware");
const userRoutes = require("./userRoutes");
const deskRoutes = require("./deskRoutes");
const companyRoutes = require("./companyRoutes");
const chairRoutes = require("./chairRoutes");
const roleRoutes = require("./roleRoutes");
const occupancyRoutes = require("./occupancyRoutes");
const floorRoutes = require("./floorRoutes");
const buildingRoutes = require("./buildingRoutes");

router.use(authMiddleware);
router.use("/users", userRoutes);
router.use("/desks", deskRoutes);
router.use("/company", companyRoutes);
router.use("/chairs", chairRoutes);
router.use("/roles", roleRoutes);
router.use("/occupy", occupancyRoutes);
router.use("/floor", floorRoutes);
router.use("/building", buildingRoutes);

module.exports = router;
