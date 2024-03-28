const { request, response } = require('express');
const Review = require('../models/review_model');
const mongoose = require('mongoose');

// get all reviews
const get_reviews = async(request, response) => {
    const reviews = await Review.find({}).sort({createdAt : -1});
    response.status(200).json(reviews);
}

// get a single review
const get_review = async (request, response) => {
    const { id } = request.params;

    const review = await Review.findById(id);

    if(!mongoose.Types.ObjectId.isValid(id)){
        return response.status(404).json({ error : "No Such Review" });
    }

    response.status(200).json(review);
}

// create a new review
const create_review = async (request, response) => {
    const {name, email, technician, date_of_service, service_type, rating, review_body} = request.body;

    try {
        const review = await Review.create({name, email, technician, date_of_service, service_type, rating, review_body});
        response.status(200).json(review);
    } catch (error) {
        response.status(400).json({error : error.message}); 
    }
}

// delete a review
const delete_review = async (request, response) => {
    const { id } = request.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return response.status(404).json({ error : "No Such Review" });
    }

    const review = await Review.findOneAndDelete({ _id : id});

    if(!review){
        return response.status(400).json({ error : "No Such Review" });
    }

    response.status(200).json(review);
}

// update a review
const update_review = async (request, response) => {
    const { id } = request.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return response.status(404).json({ error : "No Such Review" });
    }

    const review = await Review.findOneAndUpdate({ _id : id }, {
        ...request.body
    });

    response.status(200).json(review);
}

// Exporting the functions
module.exports = {
    create_review,
    get_reviews,
    get_review,
    delete_review,
    update_review
}