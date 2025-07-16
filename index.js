// ✅ Load environment variables from .env

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Stripe = require("stripe");
const connectDB = require("./routers/db"); // ✅ Corrected folder name
const Booking = require("./models/Booking");
const bookingRoutes = require("./routes/bookings");
const adminRoutes = require("./routes/admin");
require("dotenv").config(); 
const app = express();

// ✅ Stripe instance using secret key from .env
const stripe = Stripe(process.env.STRIPE_SECRET);

// ✅ Middlewares
app.use(cors());
app.use(bodyParser.json());

// ✅ Connect to MongoDB
connectDB();

// ✅ User schema and model
const User = mongoose.model("User", new mongoose.Schema({
  name: String,
  email: String,
  password: String,
}));

// ✅ Signup route
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.json({ success: false, message: "Already registered" });
  }

  await new User({ name, email, password }).save();
  return res.json({ success: true, message: "Signup Successful" });
});

// ✅ Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid password" });
  }

  res.status(200).json({ message: "Login Successful!", name: user.name });
});

// ✅ Stripe Payment route
app.post("/api/payment", async (req, res) => {
  const { token, amount } = req.body;
  try {
    const charge = await stripe.charges.create({
      amount,
      currency: "inr",
      source: token.id,
      description: "Car Rental Payment",
    });

    res.send({ success: true });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// ✅ Register routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);

// ✅ Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
