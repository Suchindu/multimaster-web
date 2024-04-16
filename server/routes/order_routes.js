const express = require('express');
const router = express.Router();
const {
    getOrders,
    getOrderById,
    createOrder,
    deleteOrder,
    updateOrder
} = require('../controllers/order_controller');

// Route to get all orders
router.get('/', getOrders);

// Route to get a single order by ID
router.get('/:id', getOrderById);

// Route to create a new order
router.post('/', createOrder);

// Route to delete an order by ID
router.delete('/:id', deleteOrder);

// Route to update an order by ID
router.patch('/:id', updateOrder);

module.exports = router;
