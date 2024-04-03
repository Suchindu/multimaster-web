const express = require('express');

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
router.post('/', (req, res) => {
    res.json({mssg: "Post a new repair!"})
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