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
    origin: ["http://localhost:5173"],
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
    const count = await Product.countDocuments();

    if (count === 0) {
      await Product.insertMany([
        {
          name: "Cotton T-Shirt",
          category: "T-Shirt",
          price: 12,
          quantity: 100,
          moq: 10,
          images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop",
          ],
          description: "High quality cotton t-shirt",
          paymentOption: "Cash",
          demoVideo: "",
          showOnHome: true,
          createdBy: "manager@gmail.com",
        },

        {
          name: "Blue Hoodie",
          category: "Hoodie",
          price: 30,
          quantity: 50,
          moq: 5,
          images: [
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop",
          ],
          description: "Warm blue hoodie",
          paymentOption: "Card",
          demoVideo: "",
          showOnHome: true,
          createdBy: "manager@gmail.com",
        },
      ]);

      console.log("Sample products inserted");
    }
  } catch (error) {
    console.log(error.message);
  }
};

insertSampleProducts();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});