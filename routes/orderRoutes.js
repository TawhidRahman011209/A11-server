import express from "express";

const router = express.Router();

// routes here
router.get("/", (req, res) => {
  res.send("Orders route working");
});

export default router;   // ✅ VERY IMPORTANT