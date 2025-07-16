const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pricePerHour: { type: Number, required: true },
  fuel: { type: String, required: true },
  maxPeople: { type: Number, required: true },
  image: { type: String, required: true },
  isBooked: { type: Boolean, default: false }
});

module.exports = mongoose.model("Car", carSchema);
