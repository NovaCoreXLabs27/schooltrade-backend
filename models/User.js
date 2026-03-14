const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  plan: {
    type: String,
    default: "basic"
  },
  badge: {
    type: String,
    default: "bronze"
  }
});

module.exports = mongoose.model("User", userSchema);
