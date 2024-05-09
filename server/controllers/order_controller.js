const Order = require("../models/order_model");
const mongoose = require("mongoose");
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
require('dotenv').config();



app.use(express.json());


//Send email using nodemailer

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "multimaster.orderconfirmation@gmail.com",
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = async (req, res) => {
  const orderDetails = req.body;

  try {
    const info = await transporter.sendMail({
      from: '"Multimaster Computer Store" <multimaster.orderconfirmation@gmail.com>',
      to: orderDetails.buyerEmail,
      subject: "Order Confirmation",
      text: `Hello ${orderDetails.buyerName}, your order ${orderDetails.productName} has been received. We are currently processing your order and will notify you once it's ready for shipment. Thank you for shopping with us.`,
html: `<b>Hello ${orderDetails.buyerName},</b><br>Your order for ${orderDetails.productName} has been received. We are currently processing your order and will notify you once it's ready for shipment.<br>Thank you for shopping with us.`
    });

    res.json({ messageId: info.messageId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error sending email' });
  }
};






// Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get a single order by ID
const getOrderById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such order" });
  }

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ error: "No such order" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


// Get a single order by UID
const getOrderByUid = async (req, res) => {
  const { uid } = req.params;

  try {
    const order = await Order.findOne({ uid: uid });
    if (!order) {
      return res.status(404).json({ error: "No such order" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get orders by email
const getOrdersByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const orders = await Order.find({ email: email });
    if (!orders) {
      return res.status(404).json({ error: "No orders found for this email" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Create a new order
const createOrder = async (req, res) => {


  try {
    const order = await Order.create(req.body)
   

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// Delete an order by ID
const deleteOrder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such order" });
  }

  try {
    const order = await Order.findOneAndDelete({ _id: id });
    if (!order) {
      return res.status(404).json({ error: "No such order" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update an order by ID
const updateOrder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such order" });
  }

  try {
    const order = await Order.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ error: "No such order" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getOrders,
  getOrderById,
  getOrderByUid,
  getOrdersByEmail,
  createOrder,
  deleteOrder,
  updateOrder,
  sendEmail,
  
};
