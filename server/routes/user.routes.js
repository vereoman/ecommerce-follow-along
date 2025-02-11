const express = require('express');
const router = express.Router();
const { Signup, Login, uploadProfilePhoto } = require('../controllers/user.controller');
const multer = require('multer');
const auth = require('../middlewares/auth.middleware');

// Configure multer for file uploads
const upload = multer({ 
    dest: 'uploads/',
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Not an image! Please upload an image.'), false);
        }
    }
});

router.post('/signup', Signup);
router.post('/login', Login);
router.post('/upload-photo', auth, upload.single('image'), uploadProfilePhoto);

module.exports = router;