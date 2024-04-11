const mongoose = require('mongoose');

const schema = mongoose.Schema;

const review_schema = new schema({
        name : {
            type : String,
            required : true
        },
        email : {
            type : String,
            required : true
        },
        technician : {
            type : String,
            required : true
        },    
        date_of_service : {
            type : String,
            required : true
        },
        service_type : {
            type : String,
            required : true
        },
        rating : {
            type : Number,
            required : true
        },
        review_body : {
            type : String,
            required : true
        }
}, {timestamps : true});

module.exports = mongoose.model('Review', review_schema);