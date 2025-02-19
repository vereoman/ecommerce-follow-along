const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const { getCart, addToCart, removeFromCart, updateCartItem, clearCart } = require('../controllers/cart.controller');

router.use(authMiddleware);

router.get('/', getCart);
router.post('/add', addToCart);
router.delete('/items/:itemId', removeFromCart);
router.put('/items/:itemId', updateCartItem);
router.delete('/clear', clearCart);

module.exports = router;