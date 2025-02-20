const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const { createProduct, getProducts, deleteProduct, updateProduct, getProductById } = require('../controllers/product.controller');
const upload = require('../config/multer');

router.get('/seller', authMiddleware, getProducts);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', authMiddleware, upload.single('image'), createProduct);
router.delete('/:id', authMiddleware, deleteProduct);
router.put('/:id', authMiddleware, upload.single('image'), updateProduct);

module.exports = router;