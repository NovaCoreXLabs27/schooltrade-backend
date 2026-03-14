const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Add product
router.post("/add", async (req, res) => {
  try {

    const product = new Product(req.body);

    await product.save();

    res.json({
      message: "Product added",
      product
    });

  } catch (error) {
    res.status(500).json({
      message: "Error adding product"
    });
  }
});

// Get all products
router.get("/", async (req, res) => {

  const products = await Product.find().populate("sellerId","name badge plan");

  res.json(products);

});

// Fresh Market
router.get("/fresh", async (req, res) => {

  const products = await Product.find({ fresh: true })
  .sort({ createdAt: -1 })
  .limit(10)
  .populate("sellerId","name badge plan");

  res.json(products);

});

module.exports = router;
