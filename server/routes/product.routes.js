// routes/product.routes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const { createProduct, getProducts, deleteProduct } = require('../controllers/product.controller');
const multer = require('multer');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });

// Protected routes - require authentication
router.post('/', authMiddleware, upload.single('image'), createProduct);
router.get('/', authMiddleware, getProducts);
router.get('/seller', authMiddleware, getProducts);
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;