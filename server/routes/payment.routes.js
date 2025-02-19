const { makePayment, verifyPayment } = require("../controllers/payment.controller");
const router = require("express").Router();

router.post("/checkout", makePayment);
router.post("/verify", verifyPayment);

module.exports = router;