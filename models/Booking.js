const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  cars: [Object],
  locationCity: String,
  bookingId: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
