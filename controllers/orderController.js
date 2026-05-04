const mongoose = require("mongoose");
const Order = require("../models/Order");

// ✅ CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      ...req.body,
      status: "Pending",
      paymentStatus: "Unpaid",
      tracking: [], // always initialize
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ✅ GET MY ORDERS
exports.getMyOrders = async (req, res) => {
  try {
    if (!req.user || !req.user.email) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const orders = await Order.find({
      userEmail: req.user.email,
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("GET MY ORDERS ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ✅ GET SINGLE ORDER (SAFE + FIXED)
exports.getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔥 FIX: prevent crash on invalid Mongo ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid order ID",
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // 🔥 FIX: ensure tracking always exists
    if (!order.tracking) {
      order.tracking = [];
    }

    res.json(order);

  } catch (error) {
    console.error("GET SINGLE ORDER ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ✅ DELETE ORDER
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid order ID",
      });
    }

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      message: "Order deleted successfully",
    });

  } catch (error) {
    console.error("DELETE ORDER ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ✅ GET PENDING ORDERS
exports.getPendingOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      status: "Pending",
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("GET PENDING ORDERS ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ✅ APPROVE ORDER
exports.approveOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndUpdate(
      id,
      {
        status: "Approved",
        approvedAt: new Date(), // 🔥 good for timeline
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);

  } catch (error) {
    console.error("APPROVE ORDER ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ✅ REJECT ORDER
exports.rejectOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndUpdate(
      id,
      { status: "Rejected" },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);

  } catch (error) {
    console.error("REJECT ORDER ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ✅ GET APPROVED ORDERS
exports.getApprovedOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      status: "Approved",
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("GET APPROVED ORDERS ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ✅ ADD TRACKING (IMPORTANT FIX)
exports.addTracking = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const trackingData = {
      status: req.body.status || "Update",
      location: req.body.location || "",
      note: req.body.note || "",
      date: new Date(),
    };

    // 🔥 FIX: ensure tracking array exists
    if (!order.tracking) {
      order.tracking = [];
    }

    order.tracking.push(trackingData);

    await order.save();

    res.json(order);

  } catch (error) {
    console.error("ADD TRACKING ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ✅ GET ALL ORDERS (ADMIN SEARCH)
exports.getAllOrders = async (req, res) => {
  try {
    const search = req.query.search || "";

    const orders = await Order.find({
      $or: [
        {
          productName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          userEmail: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    }).sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    console.error("GET ALL ORDERS ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};