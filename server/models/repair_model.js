const mongoose = require('mongoose');

const schema = mongoose.Schema;

const repair_schema = new schema({
    repair_id_int : {
        type : Number,
        required : true
    },

    repair_id_str : {
        type : String,
        required : true
    },

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    contact: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    device_brand: {
        type: String,
        required: true
    },

    device_model: {
        type: String,
        required: true
    },

    problem: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: false
    },
}, { timestamps: true });

module.exports = mongoose.model('Repair', repair_schema);