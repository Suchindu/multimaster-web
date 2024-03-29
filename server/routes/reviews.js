// Importing necessary frames
const express = require("express");
const Review = require("../models/review_model");
const {
  create_review,
  get_reviews,
  get_review,
  delete_review,
  update_review,
} = require("../controllers/reviews_controller");

// Creating an instance of a router
const router = express.Router();

// Get All Reviews
router.get("/", get_reviews);

// Get a single Review
router.get("/:id", get_review);

// Post a new review
router.post("/", create_review);

// Delete a review
router.delete("/:id", delete_review);

// Update a review
router.patch("/:id", update_review);

// Exporting the router
module.exports = router;
