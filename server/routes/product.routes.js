const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const upload = require('../config/multer');
const { createProduct, getProducts, deleteProduct, updateProduct, getProductById, searchProducts } = require('../controllers/product.controller');
const multer = require('multer');
const fs = require('fs');

const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const uploadMulter = multer({ storage: storage });

router.get('/search', searchProducts);

router.get('/seller', authMiddleware, getProducts);

router.get('/', getProducts);
router.get('/:id', getProductById);

router.post('/', authMiddleware, uploadMulter.single('image'), createProduct);
router.delete('/:id', authMiddleware, deleteProduct);
router.put('/:id', authMiddleware, uploadMulter.single('image'), updateProduct);

module.exports = router;