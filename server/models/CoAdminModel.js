const mongoose = require("mongoose");

const schema = mongoose.Schema;

const co_admin_schema = new schema({
  name: {
    type: String,
    required: true,
  },

  email: {
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

});

module.exports = mongoose.model("CoAdmin", co_admin_schema);
