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


// ✅ ADD THIS (FIXED SAVE USER CONTROLLER)

exports.saveUser = async (req, res) => {
  try {
    const {
      name,
      email,
      photoURL,
      role,
      status,
    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.json(existingUser);
    }

    // ✅ AUTO APPROVE BUYER
    const finalRole = role || "buyer";

    const finalStatus =
      finalRole === "buyer"
        ? "approved"
        : status || "pending";

    const newUser = await User.create({
      name: name || "No Name",
      email,
      photoURL: photoURL || "",
      role: finalRole,
      status: finalStatus,
    });

    res.json(newUser);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};