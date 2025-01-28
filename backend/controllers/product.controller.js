const Product = require('../models/product.model');

const createProduct = async function (req, res) {
    try {
        const { name, description, price, imageUrl } = req.body;

        const product = new Product({
            name,
            description,
            price,
            imageUrl,
        });

        await product.save();

        return res.status(201).json({
            message: 'Product created successfully!',
            product,
        });
    } catch (error) {
        return res.status(400).json({
            message: 'Error creating product',
            error: error.message,
        });
    }
};

module.exports = { createProduct };