const bcrypt = require('bcryptjs'); // Import bcryptjs for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for generating JWT tokens
const CoAdmin = require("../models/CoAdminModel");

const addCoAdmin = async (req, res, next) => {
  const { name, email, phone, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const coadmin = new CoAdmin({ name, email, phone, password: hashedPassword });
    await coadmin.save();
    return res.status(200).json({ coadmin });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to add coadmin" });
  }
};

const loginCoAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const coadmin = await CoAdmin.findOne({ email }); // Find coadmin by email

    if (!coadmin) {
      return res.status(404).json({ message: "CoAdmin not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, coadmin.password); // Compare passwords

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // If email and password are correct, generate JWT token
    const token = jwt.sign({ email: coadmin.email, userId: coadmin._id }, 'your_secret_key', { expiresIn: '1h' });

    return res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Login failed" });
  }
};

module.exports = {
  addCoAdmin,
  loginCoAdmin
};
