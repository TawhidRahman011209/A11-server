const User = require("../models/User");

exports.getMe = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.user.email,
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const search = req.query.search || "";

    const users = await User.find({
      $or: [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },

        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser =
      await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};