const express = require("express");

const {
  createProduct,
  getProducts,
  getHomeProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  getManagerProducts,
} = require("../controllers/productController");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", getProducts);

router.get("/home", getHomeProducts);

router.get(
  "/manager/my-products",
  authMiddleware,
  roleMiddleware("manager"),
  getManagerProducts
);

router.get("/:id", getSingleProduct);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("manager"),
  createProduct
);

router.delete(
  "/:id",
  authMiddleware,
  deleteProduct
);

router.patch(
  "/:id",
  authMiddleware,
  updateProduct
);

module.exports = router;