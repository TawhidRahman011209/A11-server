const User = require("../models/User");

exports.saveUser = async (req, res) => {
  try {
    const userData = req.body;

    const existingUser = await User.findOne({
      email: userData.email,
    });

    if (existingUser) {
      return res.status(200).json(existingUser);
    }

    const user = await User.create(userData);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};