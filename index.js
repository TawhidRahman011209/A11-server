require("dotenv").config();

const express = require("express");

const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const productRoutes = require("./routes/productRoutes");

const orderRoutes = require("./routes/orderRoutes");

const userRoutes = require("./routes/userRoutes");

const app = express();

connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});