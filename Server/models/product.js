const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productShema = mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      unique: 1,
      maxlength: 100
    },

    description: {
      required: true,
      type: String,
      maxlength: 100
    },

    price: {
      required: true,
      type: Number,
      maxlength: 255
    },

    catg: {
      type: Schema.Types.ObjectId,
      ref: "Catg",
      required: true
    },

    gend: {
      type: Schema.Types.ObjectId,
      ref: "Gend",
      required: true
    },

    sold: {
      type: Number,
      maxlength: 255,
      default: 0
    },
    images: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productShema);
module.exports = { Product };
