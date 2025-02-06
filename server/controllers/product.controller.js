const Product = require('../models/product.model');
const cloudinary = require('../config/cloudinary');
const User = require('../models/user.model');
const fs = require('fs');

const createProduct = async (req, res) => {
    try {
        // Verify seller status with detailed error handling
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!user.isSeller) {
            return res.status(403).json({ message: 'Only sellers can create products' });
        }

        // Validate request body
        const { name, description, price, category } = req.body;
        
        if (!name || !description || !price || !category) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Validate and handle image upload
        if (!req.file) {
            return res.status(400).json({ message: 'Product image is required' });
        }

        // Upload image to Cloudinary
        let result;
        try {
            result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'ecommerce-products',
                use_filename: true,
                unique_filename: true
            });
            
            // Clean up temporary file
            fs.unlinkSync(req.file.path);
        } catch (error) {
            return res.status(400).json({ message: 'Error uploading image' });
        }

        // Create and save product with validated data
        const product = new Product({
            name: name.trim(),
            description: description.trim(),
            price: parseFloat(price),
            category,
            seller: user._id,
            imageUrl: result.secure_url,
            cloudinaryId: result.public_id // Store Cloudinary ID for future reference
        });

        await product.save();

        res.status(201).json({
            message: 'Product created successfully',
            product: {
                _id: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                imageUrl: product.imageUrl
            }
        });
    } catch (error) {
        // Clean up uploaded file if anything fails
        if (req.file && req.file.path) {
            fs.unlinkSync(req.file.path);
        }
        
        console.error('Product creation error:', error);
        res.status(500).json({ 
            message: 'Error creating product',
            error: error.message 
        });
    }
};

const getProducts = async (req, res) => {
    try {
        const query = {};
        
        // Add seller filter if accessing /seller endpoint
        if (req.path === '/seller') {
            query.seller = req.user.userId;
        }
        
        // Add category filter if provided in query params
        if (req.query.category) {
            query.category = req.query.category.toLowerCase();
        }

        const products = await Product.find(query)
            .select('-cloudinaryId')
            .populate('seller', 'email -_id')
            .sort({ createdAt: -1 });

        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ 
            message: 'Error fetching products',
            error: error.message 
        });
    }
};

// Add function to delete product and clean up Cloudinary image
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            _id: req.params.id,
            seller: req.user.userId
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Delete image from Cloudinary
        if (product.cloudinaryId) {
            await cloudinary.uploader.destroy(product.cloudinaryId);
        }

        await product.deleteOne();

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ 
            message: 'Error deleting product',
            error: error.message 
        });
    }
};

module.exports = { createProduct, getProducts, deleteProduct };