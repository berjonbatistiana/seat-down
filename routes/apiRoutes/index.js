const router = require("express").Router();
const userRoutes = require("./userRoutes");
const deskRoutes = require("./deskRoutes");
const companyRoutes = require("./companyRoutes");
const chairRoutes = require("./chairRoutes");

router.use("/users", userRoutes);
router.use("/tables", deskRoutes);
router.use("/company", companyRoutes);
router.use("/chairs", chairRoutes);

module.exports = router;
