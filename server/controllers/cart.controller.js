const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

        if (!cart) {
            cart = await Cart.create({ user: req.user._id, items: [] });
        }

        res.json(cart);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Error fetching cart', error: error.message });
    }
};

const addToCart = async (req, res) => {
    try {
        const { productId, quantity, size } = req.body;

        if (!productId || !quantity || !size) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            cart = new Cart({ user: req.user._id, items: [] });
        }

        const existingItem = cart.items.find(item => item.product.toString() === productId && item.size === size);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity, size });
        }

        await cart.save();
        const updatedCart = await Cart.findById(cart._id).populate('items.product');

        res.json(updatedCart);
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'Error adding item to cart', error: error.message });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { itemId } = req.params;

        const cart = await Cart.findOneAndUpdate(
            { user: req.user._id },
            { $pull: { items: { _id: itemId } } },
            { new: true }
        ).populate('items.product');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.json(cart);
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ message: 'Error removing item from cart', error: error.message });
    }
};

const updateCartItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { quantity } = req.body;

        if (!quantity || quantity < 1) {
            return res.status(400).json({ message: 'Invalid quantity' });
        }

        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const item = cart.items.find(item => item._id.toString() === itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        item.quantity = quantity;
        await cart.save();
        const updatedCart = await Cart.findById(cart._id).populate('items.product');

        res.json(updatedCart);
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({ message: 'Error updating cart item', error: error.message });
    }
};

const clearCart = async (req, res) => {
    try {
        const userId = req.user._id;

        await Cart.findOneAndUpdate({ user: userId }, { items: [] });

        res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({ message: 'Error clearing cart', error: error.message });
    }
};

module.exports = { getCart, addToCart, removeFromCart, updateCartItem, clearCart };