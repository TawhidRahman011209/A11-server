const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;

    const limit = 6;

    const search = req.query.search || "";

    const query = {
      $or: [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },

        {
          category: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    };

    const total = await Product.countDocuments(
      query
    );

    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      products,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getHomeProducts = async (req, res) => {
  try {
    const products = await Product.find({
      showOnHome: true,
    }).limit(6);

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updated =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getManagerProducts = async (
  req,
  res
) => {
  try {
    const products = await Product.find({
      createdBy: req.user.email,
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};