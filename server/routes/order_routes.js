const express = require('express');
const router = express.Router();

const {
    getOrders,
    getOrderById,
    getOrderByUid,
    getOrdersByEmail,   
    createOrder,
    deleteOrder,
    updateOrder,
    sendEmail,
    
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

// Route to get a single order by UID
router.get('/orderid/:uid', getOrderByUid);

// Route to get orders by email
router.get('/emailid/:email', getOrdersByEmail);

router.post('/send-email', sendEmail);


module.exports = router;
