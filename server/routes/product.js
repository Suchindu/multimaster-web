
const express = require('express');
const router = express.Router();

const {
    GetProducts, 
    GetProductById, 
    AddProduct, 
    UpdateProduct, 
    DeleteProduct
} = require('../controllers/product_controller.js');

router.route('/')
    .get(GetProducts)
    .post(AddProduct);

router.route('/:id')
    .get(GetProductById)
    .put(UpdateProduct)
    .delete(DeleteProduct);

module.exports = router
