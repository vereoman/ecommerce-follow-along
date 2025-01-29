const Product = require('../models/product.model');

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

        if (!imageUrl) {
            return res.status(400).json({ message: "Image is required" });
        }

        const newProduct = new Product({
            name,
            description,
            price,
            imageUrl,
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};