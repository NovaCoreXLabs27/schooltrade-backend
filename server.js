require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./routes/products");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/products", productRoutes);

const userRoutes = require("./routes/users"); // <-- import the route
app.use("/users", userRoutes);  // <-- attach it to /users

// Test route
app.get("/", (req, res) => {
  res.send("SchoolTrade Backend Running");
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Error:", err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
