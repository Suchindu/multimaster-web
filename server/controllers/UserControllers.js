const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "sdfgadgnjdfvd225()55757hbbhg77ffrtgfrtrftrftrft745{}[[]99b";

//data display
const getAllUser = async (req, res, next) => {
  let user;
  // Get all Users
  try {
    user = await User.find();
  } catch (err) {
    console.log(err);
  }
  // not found
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  // Display all Users
  return res.status(200).json({ user });
};

// data Insert
const addUser = async (req, res, next) => {
  const { name, email, address, phone, password, confirmPassword } = req.body;

  // Check if password and confirmPassword match
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  // Hash the password
  const encryptedPassword = await bcrypt.hash(password, 10);

  // Check if user already exists
  const oldUser = await User.findOne({ email });
  if (oldUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  let user;

  try {
    // Create a new user instance with hashed password
    user = new User({
      name,
      email,
      address,
      phone,
      password: encryptedPassword,
      confirmPassword,
    });
    await user.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Unable to add user" });
  }

  // Return the added user
  return res.status(200).json({ user });
};

//Get by Id
const getById = async (req, res, next) => {
  const id = req.params.id;

  let user;

  try {
    user = await User.findById(id);
  } catch (err) {
    console.log(err);
  }
  // not available Users
  if (!user) {
    return res.status(404).json({ message: "user Not Found" });
  }
  return res.status(200).json({ user });
};

//Update User Details
const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, address, phone, password, confirmPassword } = req.body;

  let users;

  try {
    users = await User.findByIdAndUpdate(id, {
      name: name,
      email: email,
      address: address,
      phone: phone,
      password: password,
      confirmPassword: confirmPassword,
    });
    users = await users.save();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "Unable to Update users Details" });
  }
  return res.status(200).json({ users });
};

//Delete User Details
const deleteUser = async (req, res, next) => {
  const id = req.params.id;

  let user;

  try {
    user = await User.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!user) {
    return res.status(404).json({ message: "Unable to Delete user Details" });
  }
  return res.status(200).json({ user });
};

exports.getAllUser = getAllUser;
exports.addUser = addUser;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;

