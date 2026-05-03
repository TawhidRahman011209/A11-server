const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      unique: true,
    },

    photoURL: String,

    role: {
      type: String,
      enum: ["buyer", "manager", "admin"],
      default: "buyer",
    },

    status: {
      type: String,
      enum: [
        "pending",
        "approved",
        "suspended",
      ],
      default: "pending",
    },

    suspendReason: String,

    feedback: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "User",
  userSchema
);