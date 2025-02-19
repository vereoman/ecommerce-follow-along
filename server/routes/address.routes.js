const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const { createAddress, getAddresses } = require("../controllers/address.controller");

router.post("/", authMiddleware, createAddress);
router.get("/", authMiddleware, getAddresses);

module.exports = router;