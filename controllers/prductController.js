const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  const product = await Product.create({
    ...req.body,
    createdBy: req.user.id,
  });
  res.status(201).json(product);
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.find().populate("createdBy", "name");
  res.json(products);
};

exports.getSingleProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};