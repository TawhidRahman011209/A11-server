const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    category: String,
    price: Number,
    quantity: Number,
    minOrder: Number,
    images: [String],
    video: String,
    paymentOption: {
      type: String,
      enum: ["cod", "payfirst"],
    },
    showOnHome: { type: Boolean, default: false },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);