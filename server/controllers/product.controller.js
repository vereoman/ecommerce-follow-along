const Product = require("../models/product.model");
const cloudinary = require("../config/cloudinary");
const User = require("../models/user.model");
const fs = require("fs");

const createProduct = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!user.isSeller) {
            return res
                .status(403)
                .json({ message: "Only sellers can create products" });
        }

        const { name, description, price, category, gender } = req.body;

        if (!name || !description || !price || !category || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!req.file) {
            return res
                .status(400)
                .json({ message: "Product image is required" });
        }

        let result;
        try {
            result = await cloudinary.uploader.upload(req.file.path, {
                folder: "ecommerce-products",
                use_filename: true,
                unique_filename: true,
            });

            fs.unlinkSync(req.file.path);
        } catch (error) {
            console.error("Cloudinary upload error:", error);
            return res.status(400).json({ message: "Error uploading image" });
        }

        const product = new Product({
            name: name.trim(),
            description: description.trim(),
            price: parseFloat(price),
            category: category.toLowerCase(),
            gender: gender.toLowerCase(),
            seller: user._id,
            imageUrl: result.secure_url,
            cloudinaryId: result.public_id,
        });

        await product.save();

        const savedProduct = await Product.findById(product._id).populate(
            "seller",
            "email name"
        );

        res.status(201).json({
            message: "Product created successfully",
            product: savedProduct,
        });
    } catch (error) {
        if (req.file && req.file.path) {
            fs.unlinkSync(req.file.path);
        }

        console.error("Product creation error:", error);
        res.status(500).json({
            message: "Error creating product",
            error: error.message,
        });
    }
};

const getProducts = async (req, res) => {
    try {
        const query = {};

        if (req.path.includes("/seller")) {
            if (!req.user || !req.user._id) {
                return res
                    .status(401)
                    .json({ message: "User not authenticated" });
            }
            query.seller = req.user._id;
        }

        const products = await Product.find(query)
            .populate("seller", "email name")
            .sort({ createdAt: -1 });

        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            message: "Error fetching products",
            error: error.message,
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            _id: req.params.id,
            seller: req.user._id,
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.cloudinaryId) {
            try {
                await cloudinary.uploader.destroy(product.cloudinaryId);
            } catch (error) {
                console.error("Error deleting image from Cloudinary:", error);
            }
        }

        await Product.deleteOne({ _id: product._id });

        res.status(200).json({
            message: "Product deleted successfully",
            productId: req.params.id,
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({
            message: "Error deleting product",
            error: error.message,
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, gender } = req.body;

        if (!name || !description || !price || !category || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const product = await Product.findOne({
            _id: req.params.id,
            seller: req.user._id,
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        product.name = name.trim();
        product.description = description.trim();
        product.price = parseFloat(price);
        product.category = category.toLowerCase();
        product.gender = gender.toLowerCase();

        if (req.file) {
            try {
                if (product.cloudinaryId) {
                    await cloudinary.uploader.destroy(product.cloudinaryId);
                }

                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: "ecommerce-products",
                    use_filename: true,
                    unique_filename: true,
                });

                product.imageUrl = result.secure_url;
                product.cloudinaryId = result.public_id;

                fs.unlinkSync(req.file.path);
            } catch (error) {
                throw new Error("Error processing image upload");
            }
        }

        await product.save();

        res.status(200).json(product);
    } catch (error) {
        if (req.file && req.file.path) {
            fs.unlinkSync(req.file.path);
        }

        console.error("Error updating product:", error);
        res.status(500).json({
            message: "Error updating product",
            error: error.message,
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .select("-cloudinaryId")
            .populate("seller", "email -_id");

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({
            message: "Error fetching product",
            error: error.message,
        });
    }
};

module.exports = { createProduct, getProducts, deleteProduct, updateProduct, getProductById };