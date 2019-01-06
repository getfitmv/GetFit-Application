const mongoose = require("mongoose");

const gendSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    unique: 1,
    maxlength: 100
  }
});

const Gend = mongoose.model("Gend", gendSchema);
module.exports = { Gend };
