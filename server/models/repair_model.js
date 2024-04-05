const mongoose = require('mongoose');

const schema = mongoose.Schema;

const repair_schema = new schema({
    name: {
        type: String,
        required: true
    },

    email: {
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