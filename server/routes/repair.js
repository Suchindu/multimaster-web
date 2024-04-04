const express = require('express');
const Repair = require('../models/repair_model');
const router = express.Router();

//get all repairs
router.get('/', (req, res) => {
    res.json({mssg: "Get all repairs!"})
});

//get a single repair
router.get('/:id', (req, res) => {
    res.json({mssg: "Get a single repair!"})
});

//post a new repair
router.post('/', async(req, res) => {
    const {name, email, date, device_brand, device_model, problem, description} = req.body;
    try {
        const repair = await Repair.create({name, email, date, device_brand, device_model, problem, description})
        res.status(200).json({repair})
    } catch(error){
        res.status(400).json({error: error.message})
    }

    // res.json({mssg: "Post a new repair!"})
});

//delete a repair
router.delete('/:id', (req, res) => {
    res.json({mssg: "Delete a repair!"})
});

//update the repair
router.patch('/:id', (req, res) => {
    res.json({mssg: "Update a repair!"})
});

module.exports = router;  