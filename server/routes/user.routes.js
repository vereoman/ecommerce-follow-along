const express = require('express');
const router = express.Router();
const { Signup, Login } = require('../controllers/user.controller');

router.post('/signup', Signup);
router.post('/login', Login);

module.exports = router;