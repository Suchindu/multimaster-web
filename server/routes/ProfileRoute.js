const express = require("express");
const router = express.Router();

//Insert User Controller
const UserProfileController = require("../controllers/ProfileControlers");

router.post("/", UserProfileController.getProfile);
//export
module.exports = router;
  