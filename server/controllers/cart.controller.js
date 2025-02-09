const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id })
                            .populate('items.product');
        
        if (!cart) {
            cart = await Cart.create({ user: req.user._id, items: [] });
        }
        
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addToCart = async (req, res) => {
    try {
        const { productId, quantity, size } = req.body;
        
        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            cart = await Cart.create({ user: req.user._id, items: [] });
        }

        const existingItem = cart.items.find(
            item => item.product.toString() === productId && item.size === size
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity, size });
        }

        await cart.save();
        cart = await cart.populate('items.product');
        
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { itemId } = req.params;
        const cart = await Cart.findOne({ user: req.user._id });
        
        cart.items = cart.items.filter(item => item._id.toString() !== itemId);
        await cart.save();
        
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCartItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { quantity } = req.body;
        
        const cart = await Cart.findOne({ user: req.user._id });
        const item = cart.items.find(item => item._id.toString() === itemId);
        
        if (item) {
            item.quantity = quantity;
            await cart.save();
        }
        
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getCart, addToCart, removeFromCart, updateCartItem };
