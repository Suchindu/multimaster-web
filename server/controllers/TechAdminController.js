const bcrypt = require('bcryptjs'); // Import bcryptjs for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for generating JWT tokens
const TechAdmin = require("../models/TechAdminModel");

const addTechAdmin = async (req, res, next) => {
  const { name, email, phone, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const techadmin = new TechAdmin({ name, email, phone, password: hashedPassword });
    await techadmin.save();
    return res.status(200).json({ techadmin });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to add techadmin" });
  }
};

const loginTechAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const techadmin = await TechAdmin.findOne({ email }); // Find techadmin by email

    if (!techadmin) {
      return res.status(404).json({ message: "TechAdmin not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, techadmin.password); // Compare passwords

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // If email and password are correct, generate JWT token
    const token = jwt.sign({ email: techadmin.email, userId: techadmin._id }, 'your_secret_key', { expiresIn: '1h' });

    return res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Login failed" });
  }
};

module.exports = {
  addTechAdmin,
  loginTechAdmin
};
