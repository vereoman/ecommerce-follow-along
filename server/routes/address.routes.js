const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const { createAddress, getAddresses } = require("../controllers/address.controller");

router.post("/", auth, createAddress);
router.get("/", auth, getAddresses);

module.exports = router; 