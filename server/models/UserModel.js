const mongoose = require("mongoose");

const schema = mongoose.Schema;

const user_schema = new schema({
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

  password: {
    type: String,
    required: true,
  },

  confirmPassword: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", user_schema);
