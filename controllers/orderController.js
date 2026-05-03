const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      ...req.body,

      status: "Pending",

      paymentStatus: "Unpaid",

      tracking: [],
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      userEmail: req.user.email,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(
      req.params.id
    );

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getPendingOrders = async (
  req,
  res
) => {
  try {
    const orders = await Order.find({
      status: "Pending",
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.approveOrder = async (req, res) => {
  try {
    const order =
      await Order.findByIdAndUpdate(
        req.params.id,
        {
          status: "Approved",
        },
        {
          new: true,
        }
      );

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.rejectOrder = async (req, res) => {
  try {
    const order =
      await Order.findByIdAndUpdate(
        req.params.id,
        {
          status: "Rejected",
        },
        {
          new: true,
        }
      );

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getApprovedOrders = async (
  req,
  res
) => {
  try {
    const orders = await Order.find({
      status: "Approved",
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.addTracking = async (req, res) => {
  try {
    const trackingData = {
      ...req.body,
      date: new Date(),
    };

    const order = await Order.findById(
      req.params.id
    );

    order.tracking.push(trackingData);

    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

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
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};