const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.post('/products', productController.createProduct);

router.get()

module.exports = router;