const express = require("express");
const router = express.Router();
const Car = require("../models/Car");
const Booking = require("../models/Booking");

// Get all cars
router.get("/cars", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Get all bookings
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("car");
    res.json(bookings);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Add new car
router.post("/add-car", async (req, res) => {
  try {
    const newCar = new Car(req.body);
    await newCar.save();
    res.send("Car added successfully");
  } catch (err) {
    res.status(500).send("Error saving car");
  }
});

// Delete car
router.delete("/delete-car/:id", async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.send("Car deleted successfully");
  } catch (err) {
    res.status(500).send("Error deleting car");
  }
});

module.exports = router;
