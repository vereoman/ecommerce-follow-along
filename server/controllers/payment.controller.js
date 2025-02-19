const crypto = require("crypto");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});

const makePayment = async (req, res) => {
    try {
        const { total } = req.body;

        const options = {
            amount: total * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);
        res.json({ success: true, orderId: order.id, amount: order.amount });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET_KEY);
        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
        const expectedSignature = hmac.digest("hex");

        if (expectedSignature === razorpay_signature) {
            return res.json({ success: true, message: "Payment verified successfully" });
        } else {
            return res.status(400).json({ success: false, message: "Payment verification failed" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { makePayment, verifyPayment };