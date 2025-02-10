const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const cartController = require('../controllers/cart.controller');

// Apply auth middleware to all cart routes
router.use(authMiddleware);

// Cart routes
router.get('/', cartController.getCart);
router.post('/add', cartController.addToCart);
router.delete('/items/:itemId', cartController.removeFromCart);
router.put('/items/:itemId', cartController.updateCartItem);

module.exports = router;
