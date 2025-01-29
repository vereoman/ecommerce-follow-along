const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const upload = require('../config/multer');

router.post('/products', upload.single('image'), productController.createProduct);

router.get('/products', productController.getProducts);

module.exports = router;