const express = require("express");

const {
  getMe,
  getUsers,
  updateUser,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/me",
  authMiddleware,
  getMe
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  getUsers
);

router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateUser
);

module.exports = router;