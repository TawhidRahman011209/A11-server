const User = require("../models/User");

const roleMiddleware = (role) => {
  return async (req, res, next) => {
    const user = await User.findOne({
      email: req.user.email,
    });

    if (
      user.role !== role ||
      user.status === "suspended"
    ) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    next();
  };
};

module.exports = roleMiddleware;