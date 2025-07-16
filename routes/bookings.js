const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking"); // ✅ import Booking model

// 📌 Create Booking (POST /api/bookings/book)
router.post("/book", async (req, res) => {
  try {
    const newBooking = new Booking(req.body); // create new Booking document
    await newBooking.save(); // save to MongoDB
    res.status(201).send({ message: "Booking saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to save booking" });
  }
});

// 📌 Get All Bookings (GET /api/bookings)
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.send(bookings);
  } catch (err) {
    res.status(500).send(err);
  }
});

// 📌 Cancel Booking Route (DELETE /api/bookings/:id)
router.delete("/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.send("Booking cancelled");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
