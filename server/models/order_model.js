const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({

  uid: {
    type: String,
    required: true,
  },


  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  products: [productSchema], // Array of subdocuments representing products

  totalPrice: {
    type: Number,
    required: true
  },


  additionalDetails: {
    type: String
  },
  
  orderState: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
