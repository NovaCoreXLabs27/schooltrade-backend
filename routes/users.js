const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Upgrade seller plan
router.post("/upgrade", async (req, res) => {
  try {
    const { userId, newPlan } = req.body;

    if (!["basic", "moderate", "pro", "marketer"].includes(newPlan)) {
      return res.status(400).json({ message: "Invalid plan" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.plan = newPlan;

    // Update badge automatically
    const badges = { basic: "Bronze", moderate: "Silver", pro: "Gold", marketer: "Diamond" };
    user.badge = badges[newPlan];

    await user.save();

    res.json({ message: "Plan upgraded!", user });
  } catch (err) {
    res.status(500).json({ message: "Error upgrading plan" });
  }
});

module.exports = router;
