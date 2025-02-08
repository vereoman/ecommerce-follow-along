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
        const { name, description, price, category, gender } = req.body;
        
        if (!name || !description || !price || !category || !gender) {
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
            console.error('Cloudinary upload error:', error);
            return res.status(400).json({ message: 'Error uploading image' });
        }

        // Create and save product with validated data
        const product = new Product({
            name: name.trim(),
            description: description.trim(),
            price: parseFloat(price),
            category: category.toLowerCase(),
            gender: gender.toLowerCase(),
            seller: user._id,
            imageUrl: result.secure_url,
            cloudinaryId: result.public_id
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
                gender: product.gender,
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
        if (req.path === '/seller' && req.user) {
            query.seller = req.user.userId;
        }
        
        // Add category filter if provided in query params
        if (req.query.category) {
            query.category = req.query.category.toLowerCase();
        }

        // Remove authentication requirement for fetching products
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

const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, gender } = req.body;
        
        // Validate required fields
        if (!name || !description || !price || !category || !gender) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const product = await Product.findOne({
            _id: req.params.id,
            seller: req.user.userId
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update fields with validation
        product.name = name.trim();
        product.description = description.trim();
        product.price = parseFloat(price);
        product.category = category.toLowerCase();
        product.gender = gender.toLowerCase();

        // If there's a new image
        if (req.file) {
            try {
                // Delete old image from Cloudinary
                if (product.cloudinaryId) {
                    await cloudinary.uploader.destroy(product.cloudinaryId);
                }
                
                // Upload new image
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: 'ecommerce-products',
                    use_filename: true,
                    unique_filename: true
                });
                
                // Update image fields
                product.imageUrl = result.secure_url;
                product.cloudinaryId = result.public_id;
                
                // Clean up temporary file
                fs.unlinkSync(req.file.path);
            } catch (error) {
                throw new Error('Error processing image upload');
            }
        }

        await product.save();

        res.status(200).json(product);
    } catch (error) {
        // Clean up uploaded file if anything fails
        if (req.file && req.file.path) {
            fs.unlinkSync(req.file.path);
        }
        
        console.error('Error updating product:', error);
        res.status(500).json({ 
            message: 'Error updating product',
            error: error.message 
        });
    }
};

// Add this new function
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .select('-cloudinaryId')
            .populate('seller', 'email -_id');

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ 
            message: 'Error fetching product',
            error: error.message 
        });
    }
};

// Update the exports to include the new function
module.exports = { 
    createProduct, 
    getProducts, 
    deleteProduct, 
    updateProduct,
    getProductById
};