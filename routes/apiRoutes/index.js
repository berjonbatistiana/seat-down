const router = require("express").Router();
const userRoutes = require("./userRoutes");
const deskRoutes = require("./deskRoutes");
const companyRoutes = require("./companyRoutes");
const chairRoutes = require("./chairRoutes");
const roleRoutes = require("./roleRoutes");

router.use("/users", userRoutes);
router.use("/desks", deskRoutes);
router.use("/company", companyRoutes);
router.use("/chairs", chairRoutes);
router.use("/roles", roleRoutes);

module.exports = router;
