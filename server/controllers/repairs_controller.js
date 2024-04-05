const Repair = require('../models/repair_model');
const mongoose = require('mongoose');

//get all repairs
const get_repairs = async (req, res) => {
    const repairs = await Repair.find({}).sort({createdAt: -1});
    res.status(200).json(repairs);

}


//get a single repair
const get_repair = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such repair"})
    }

    const repair = await Repair.findById(id);

    if(!repair){
        return res.status(404).json({error: "No such repair"})
    }

    res.status(200).json(repair);
}

//post a new repair
const createRepair = async (req, res) => {
    const {name, email, date, device_brand, device_model, problem, description} = req.body;
    try {
        const repair = await Repair.create({name, email, date, device_brand, device_model, problem, description})
        res.status(200).json({repair})
    } catch(error){
        res.status(400).json({error: error.message})
    }
}


//delete a repair
const deleteRepair = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such repair"})
    }

    const repair = await Repair.findOneAndDelete({_id: id});

    if(!repair){
        return res.status(400).json({error: "No such repair"})
    }

    res.status(200).json(repair);

}




//update the repair
const updateRepair = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such repair"})
    }

    const repair = await Repair.findOneAndUpdate({_id: id}, {
        ...req.body
    });

    if(!repair){
        return res.status(400).json({error: "No such repair"})
    }

    res.status(200).json(repair);
}



module.exports = {
    get_repairs,
    get_repair,
    createRepair,
    deleteRepair,
    updateRepair}