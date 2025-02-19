// routes/order.routes.js
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// POST /api/orders - Create orders
router.post("/", authMiddleware, orderController.createOrder);

// GET /api/orders?userEmail=... - Get orders for a user
router.get("/", authMiddleware, orderController.getOrdersByUser);

// PATCH /api/orders/:orderId/cancel - Cancel a specific order
router.patch("/:orderId/cancel", authMiddleware, orderController.cancelOrder);

module.exports = router;