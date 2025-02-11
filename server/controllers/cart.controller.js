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
        res.status(500).json({ message: 'Error fetching cart' });
    }
};

const addToCart = async (req, res) => {
    try {
        const { productId, quantity, size } = req.body;
        console.log('Add to cart request:', { productId, quantity, size });
        console.log('User:', req.user);

        // Validation
        if (!productId || !quantity || !size) {
            console.log('Missing required fields:', { productId, quantity, size });
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            console.log('Product not found:', productId);
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find or create cart
        let cart = await Cart.findOne({ user: req.user._id });
        console.log('Existing cart:', cart);
        
        if (!cart) {
            cart = new Cart({ user: req.user._id, items: [] });
            console.log('Created new cart:', cart);
        }

        // Check if item already exists in cart
        const existingItemIndex = cart.items.findIndex(
            item => item.product.toString() === productId && item.size === size
        );

        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += quantity;
            console.log('Updated existing item quantity');
        } else {
            cart.items.push({ product: productId, quantity, size });
            console.log('Added new item to cart');
        }

        await cart.save();
        console.log('Saved cart:', cart);
        
        // Populate product details before sending response
        cart = await Cart.findById(cart._id).populate('items.product');
        
        res.json(cart);
    } catch (error) {
        console.error('Server error in addToCart:', error);
        res.status(500).json({ 
            message: 'Error adding item to cart',
            error: error.message 
        });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { itemId } = req.params;
        const cart = await Cart.findOne({ user: req.user._id });
        
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item._id.toString() !== itemId);
        await cart.save();
        
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error removing item from cart' });
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
        
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error updating cart item' });
    }
};

module.exports = { getCart, addToCart, removeFromCart, updateCartItem };