const Product = require('../models/product.model');
const cloudinary = require('../config/cloudinary');

const createProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'Image is required' });
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'ecommerce-products'
        });

        const newProduct = new Product({
            name: name.trim(),
            description: description.trim(),
            price: parseFloat(price),
            category: category,
            imageUrl: result.secure_url
        });

        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

module.exports = { createProduct, getProducts };
