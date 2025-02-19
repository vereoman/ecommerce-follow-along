const Order = require("../models/order.model");
const Address = require("../models/address.model");

const createOrder = async (req, res) => {
    try {
        const { products, address } = req.body;
        const user = req.user;

        if (!products || !address) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        let shippingAddress = address;
        if (typeof address === "string") {
            const addr = await Address.findById(address);
            if (!addr) {
                return res.status(404).json({ message: "Address not found" });
            }
            shippingAddress = addr.toObject();
        }

        const orders = [];
        for (const item of products) {
            const newOrder = new Order({
                user: user._id,
                product: item.product,
                quantity: item.quantity,
                shippingAddress,
                status: "placed",
            });
            await newOrder.save();
            orders.push(newOrder);
        }
        res.status(201).json({ message: "Orders created", orders });
    } catch (error) {
        console.error("Create order error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getOrdersByUser = async (req, res) => {
    try {
        const user = req.user;
        const orders = await Order.find({ user: user._id, status: { $ne: "canceled" } })
            .populate("product");

        res.json(orders);
    } catch (error) {
        console.error("Get orders error: ", error);
        res.status(500).json({ message: "Server Error" });
    }
};

const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        if (!orderId) {
            return res.status(400).json({ message: "Order ID is required" });
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (order.status === "canceled") {
            return res.status(400).json({ message: "Order is already canceled" });
        }

        order.status = "canceled";
        await order.save();

        res.status(200).json({ message: "Order canceled successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Error canceling order", error: error.message });
    }
};

module.exports = { createOrder, getOrdersByUser, cancelOrder };