const mongoose = require("mongoose");

const trackingSchema = new mongoose.Schema({
  status: String,
  location: String,
  note: String,
  time: { type: Date, default: Date.now },
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: Number,
    totalPrice: Number,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    payment: String,
    address: String,
    phone: String,
    tracking: [trackingSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);