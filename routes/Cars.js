const express = require("express");
const router = express.Router();
const Car = require("../models/Car"); // ✅ import Car model

// 📌 GET All Cars - GET /api/admin/cars
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find(); // get all cars from MongoDB
    res.json(cars); // send as JSON
  } catch (err) {
    console.error("Error fetching cars:", err);
    res.status(500).send("Error fetching cars");
  }
});

module.exports = router;
