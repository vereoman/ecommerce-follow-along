const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'ecommerce-products',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        use_filename: true,
        unique_filename: true
    }
});

const upload = multer({ storage });

module.exports = upload;