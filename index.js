require("dotenv").config();

const express = require("express");

const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const productRoutes = require("./routes/productRoutes");

const orderRoutes = require("./routes/orderRoutes");

const userRoutes = require("./routes/userRoutes");

const Product = require("./models/Product");

const app = express();

connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
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

const insertSampleProducts = async () => {
  try {
    // DELETE OLD PRODUCTS
    await Product.deleteMany({});

    // INSERT NEW PRODUCTS
    await Product.insertMany([
      {
        name: "Cotton T-Shirt",
        category: "T-Shirt",
        price: 12,
        quantity: 100,
        images: [
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop",
        ],
      },

      {
        name: "Black Denim Jacket",
        category: "Jacket",
        price: 45,
        quantity: 25,
        images: [
          "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1000&auto=format&fit=crop",
        ],
      },

      {
        name: "Classic Polo Shirt",
        category: "Polo",
        price: 20,
        quantity: 60,
        images: [
          "https://images.unsplash.com/photo-1503341504253-dff4815485f1",
        ],
      },

      {
        name: "Oversized Hoodie",
        category: "Hoodie",
        price: 35,
        quantity: 40,
        images: [
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
        ],
      },

      {
        name: "Slim Fit Jeans",
        category: "Jeans",
        price: 38,
        quantity: 50,
        images: [
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
        ],
      },
    ]);

    console.log("Sample products inserted");
  } catch (error) {
    console.log(error.message);
  }
};

insertSampleProducts();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});