const express = require("express");
const router = express.Router();

// Insert User Controller
const TechAdminController = require("../controllers/TechAdminController");

// Route for adding a CoAdmin
router.post("/techadd", TechAdminController.addTechAdmin);

// Route for logging in a CoAdmin
router.post("/techlogin", TechAdminController.loginTechAdmin);

// Export the router
module.exports = router;
