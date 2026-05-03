// require("dotenv").config();
// const express = require("express");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const connectDB = require("./config/db");

// const app = express();

// connectDB();

// app.use(cors({ origin: true, credentials: true }));
// app.use(express.json());
// app.use(cookieParser());

// app.use("/api/products", require("./routes/productRoutes"));
// app.use("/api/orders", require("./routes/orderRoutes"));
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/users", require("./routes/userRoutes"));

// app.get("/", (req, res) => {
//   res.send("API running...");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));