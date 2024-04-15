const asyncHandler = require('../middleware/asyncHandler.js');
const Product = require('../models/product_model.js');
const validateMongoDbId = require("../utils/validateMongodbId");


// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const GetProducts = asyncHandler(async (req, res) => {
    try {
    //get page numbers from api
    const pageSize = process.env.PAGINATION_LIMIT;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword//if key word match get product
        ? {
        name: {
            $regex: req.query.keyword,//pattern matchin operator
            $options: 'i',//case-insensitive
            },
        }
        : {};//if not get total number of products
    //get count of products   
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })//find all the product keyword match
        .limit(pageSize)//limit the number of products matching to page size
        .skip(pageSize * (page - 1));//skip the products of the previous page

    res.json({ products, page, pages: Math.ceil(count / pageSize) });//return the products,current page and total number of pages
    } catch (error) {
        res.status(404).json({ error: "Product Not found" });
    }
    });



// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const GetProductById = asyncHandler(async (req, res) => {
    const id = req.params;
    validateMongoDbId(id);
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (error){
        res.status(404);
        throw new Error('Product not found');
    }

});



//@desc     Add a product
//@route    POST /api/products
//@access   Admin
const AddProduct = asyncHandler(async (req, res, next) => {
    const product = new Product({
        // user: req.user._id,
        name: req.body.name,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        countInStock: req.body.countInStock
    });
    try {
        const AddedProduct = await product.save();
        res.status(201).json({ AddedProduct });
    } catch (error) {
        res.status(404).json({ error });
    }
});



//@desc     Update a product
//@route    PUT /api/products/:id
//@access   Admin
const UpdateProduct = asyncHandler(async (req, res) => {
    const id = req.params;
    validateMongoDbId(id);
    try{
        const updatedProduct = await Product.findOneAndUpdate({_id: req.params.id}, {...req.body}, {new: true});
        res.json(updatedProduct);

    } catch (error) {
        res.status(404);
        throw new Error(error.message);
    }
});



// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Admin
const DeleteProduct = asyncHandler(async (req, res) => {
    const id = req.params;
    validateMongoDbId(id);
    try {
    const product = await Product.findById(req.params.id);

        if (product) {
            await Product.deleteOne({ _id: product._id });
            res.json({ message: 'Product removed' });
        }
    } 
    catch (error){
        res.status(404);
        throw new Error('Product not found');
    }
});


module.exports = { 
    GetProducts, 
    GetProductById, 
    AddProduct, 
    UpdateProduct, 
    DeleteProduct
};