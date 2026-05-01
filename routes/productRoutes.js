const express = require("express");
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);

router.post("/", protect, authorizeRoles("manager"), createProduct);

router.delete("/:id", protect, authorizeRoles("manager", "admin"), deleteProduct);

module.exports = router;