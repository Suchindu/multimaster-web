const express = require("express");
const router = express.Router();

//Insert User Controller
const UserLoginController = require("../controllers/UserLoginControllers");

router.post("/", UserLoginController.loginUser);
//export
module.exports = router;
  