const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,

    category: String,

    price: Number,

    quantity: Number,

    moq: Number,

    images: [String],

    description: String,

    paymentOption: String,

    demoVideo: String,

    showOnHome: {
      type: Boolean,
      default: false,
    },

    createdBy: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Product",
  productSchema
);