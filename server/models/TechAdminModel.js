const mongoose = require("mongoose");

const schema = mongoose.Schema;

const tech_admin_schema = new schema({
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

module.exports = mongoose.model("TechAdmin", tech_admin_schema);
