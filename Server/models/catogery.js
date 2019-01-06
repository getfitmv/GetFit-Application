const mongoose = require("mongoose");

const catgSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    unique: 1,
    maxlength: 100
  }
});

const Catg = mongoose.model("Catg", catgSchema);
module.exports = { Catg };
