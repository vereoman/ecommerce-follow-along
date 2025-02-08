// routes/product.routes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const { createProduct, getProducts, deleteProduct, updateProduct, getProductById } = require('../controllers/product.controller');
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

// Public routes - no authentication required
router.get('/', getProducts);
router.get('/:id', getProductById);

// Protected routes - require authentication
router.post('/', authMiddleware, upload.single('image'), createProduct);
router.get('/seller', authMiddleware, getProducts);
router.delete('/:id', authMiddleware, deleteProduct);
router.put('/:id', authMiddleware, upload.single('image'), updateProduct);

module.exports = router;