const express = require("express");

const {
  createOrder,
  getMyOrders,
  getSingleOrder,
  deleteOrder,
  getPendingOrders,
  approveOrder,
  rejectOrder,
  getApprovedOrders,
  addTracking,
  getAllOrders,
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("buyer"),
  createOrder
);

router.get(
  "/my-orders",
  authMiddleware,
  roleMiddleware("buyer"),
  getMyOrders
);

router.get(
  "/pending",
  authMiddleware,
  roleMiddleware("manager"),
  getPendingOrders
);

router.get(
  "/approved",
  authMiddleware,
  roleMiddleware("manager"),
  getApprovedOrders
);

router.get(
  "/admin/all",
  authMiddleware,
  roleMiddleware("admin"),
  getAllOrders
);

router.get(
  "/:id",
  authMiddleware,
  getSingleOrder
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("buyer"),
  deleteOrder
);

router.patch(
  "/approve/:id",
  authMiddleware,
  roleMiddleware("manager"),
  approveOrder
);

router.patch(
  "/reject/:id",
  authMiddleware,
  roleMiddleware("manager"),
  rejectOrder
);

router.patch(
  "/tracking/:id",
  authMiddleware,
  roleMiddleware("manager"),
  addTracking
);

module.exports = router;