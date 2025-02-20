const express = require("express");
// const Repair = require('../models/repair_model');
const {
  createRepair,
  get_repairs,
  get_repair,
  get_repair_by_str_id,
  deleteRepair,
  updateRepair,
} = require("../controllers/repairs_controller");
const router = express.Router();

//get all repairs
router.get("/", get_repairs);

//get a single repair
router.get("/:id", get_repair);

//get a single repair by repair_id_str
router.get("/str/:id", get_repair_by_str_id);

//post a new repair
router.post("/", createRepair);

//delete a repair
router.delete("/:id", deleteRepair);

//update the repair
router.patch("/:id", updateRepair);

module.exports = router;
