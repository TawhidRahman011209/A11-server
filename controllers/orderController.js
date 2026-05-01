const Order = require("../models/Order");
const Product = require("../models/Product");

exports.createOrder = async (req, res) => {
  const { productId, quantity, address, phone } = req.body;

  const product = await Product.findById(productId);

  if (!product)
    return res.status(404).json({ message: "Product not found" });

  if (quantity < product.minOrder || quantity > product.quantity) {
    return res.status(400).json({ message: "Invalid quantity" });
  }

  const totalPrice = quantity * product.price;

  const order = await Order.create({
    user: req.user.id,
    product: productId,
    quantity,
    totalPrice,
    address,
    phone,
    payment: product.paymentOption,
  });

  res.status(201).json(order);
};

exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate("product");
  res.json(orders);
};