const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "sdfgadgnjdfvd225()55757hbbhg77ffrtgfrtrftrftrft745{}[[]99b";

const getProfile = async (req, res, next) => {
  const { token } = req.body;

  try {
    // Verify the JWT token
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.userId;

    // Find the user in the database by userId
    const user = await User.findById(userId);

    // Check if the user exists
    if (user) {
      // Send the response with user data
      res.status(200).json({ status: "ok", user });
    } else {
      // If user not found, send 404 error response
      res.status(404).json({ status: "error", message: "User not found" });
    }
  } catch (err) {
    // Handle token verification errors
    console.error(err);
    res.status(401).json({ status: "error", message: "Invalid token" });
  }
};

exports.getProfile = getProfile;
