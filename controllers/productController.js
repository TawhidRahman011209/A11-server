const Product = require("../models/Product");

// ✅ CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ✅ GET PRODUCTS (FIXED 🔥)
exports.getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 6;
    const search = req.query.search?.trim();

    let query = {};

    // ✅ ONLY apply search if it exists
    if (search) {
      query = {
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
    }

    const total = await Product.countDocuments(query);

    const products = await Product.find(query)
      .sort({ createdAt: -1 }) // ✅ newest first
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      products,
      totalPages: Math.ceil(total / limit),
    });

  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ✅ HOME PRODUCTS
exports.getHomeProducts = async (req, res) => {
  try {
    const products = await Product.find({
      showOnHome: true,
    }).limit(6);

    res.json(products);
  } catch (error) {
    console.error("HOME PRODUCTS ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ✅ GET SINGLE PRODUCT (FIXED 🔥)
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    console.error("GET SINGLE PRODUCT ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ✅ DELETE PRODUCT (FIXED 🔥)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Deleted",
    });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ✅ UPDATE PRODUCT (FIXED 🔥)
exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true, // ✅ important
      }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(updated);
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ✅ MANAGER PRODUCTS
exports.getManagerProducts = async (req, res) => {
  try {
    const products = await Product.find({
      createdBy: req.user.email,
    });

    res.json(products);
  } catch (error) {
    console.error("MANAGER PRODUCTS ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};