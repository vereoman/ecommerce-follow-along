const express = require('express');
const router = express.Router();
const { Signup, Login, updateProfile } = require('../controllers/user.controller');
const upload = require('../config/multer');
const auth = require('../middlewares/auth.middleware');

router.post('/signup', Signup);
router.post('/login', Login);
router.post('/upload-photo', auth, upload.single('profilePhoto'), updateProfile);

module.exports = router;