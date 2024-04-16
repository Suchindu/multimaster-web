const express = require("express");
const router = express.Router();

// Insert User Controller
const CoAdminController = require("../controllers/CoAdminController");

// Route for adding a CoAdmin
router.post("/coadd", CoAdminController.addCoAdmin);

// Route for logging in a CoAdmin
router.post("/cologin", CoAdminController.loginCoAdmin);

// Export the router
module.exports = router;
