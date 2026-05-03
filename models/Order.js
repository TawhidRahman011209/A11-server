const mongoose = require("mongoose");

const trackingSchema = new mongoose.Schema({
  status: String,

  location: String,

  note: String,

  date: Date,
});

const orderSchema = new mongoose.Schema(
  {
    userEmail: String,

    productId: String,

    productName: String,

    firstName: String,

    lastName: String,

    quantity: Number,

    totalPrice: Number,

    phone: String,

    address: String,

    notes: String,

    status: String,

    paymentMethod: String,

    paymentStatus: String,

    tracking: [trackingSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Order",
  orderSchema
);