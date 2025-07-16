const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  isLoggedIn: { type: Boolean, default: false }
});

module.exports = mongoose.model("Customer", CustomerSchema);
