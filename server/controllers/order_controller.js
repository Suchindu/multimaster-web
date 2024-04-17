const Order = require("../models/order_model");
const mongoose = require("mongoose");

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

// Create a new order
const createOrder = async (req, res) => {
  // const {
  //   //userId,
  //   //products,
  //   //totalPrice,
  //   firstName,
  //   lastName,
  //   email,
  //   mobileNumber,
  //   streetAddress,
  //   city,
  //   province,
  //   postalCode,
  //   paymentSlip,
  //   additionalDetails,
  //   orderState,
  // } = req.body;

  try {
    const order = await Order.create(req.body)
    // const order = await Order.create({
    //  // userId,
    //  // products,
    //   //totalPrice,
    //   firstName,
    //   lastName,
    //   email,
    //   mobileNumber,
    //   streetAddress,
    //   city,
    //   province,
    //   postalCode,
    //   paymentSlip,
    //   additionalDetails,
    //   orderState,
    // });
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
  createOrder,
  deleteOrder,
  updateOrder,
};
