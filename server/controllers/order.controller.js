// controllers/order.controller.js
const Order = require("../models/order.model");
const User = require("../models/user.model");
const Address = require("../models/address.model");

/**
 * Create orders for each product.
 * Expects request body to have:
 * - products: an array of objects { product: productId, quantity }
 * - userEmail: the email of the user placing the order
 * - address: either the address _id (string) or full address details { street, city, state, postalCode }
 */
exports.createOrder = async (req, res) => {
  try {
    const { products, userEmail, address } = req.body;
    if (!products || !userEmail || !address) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Retrieve user using email
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Determine shippingAddress from the provided address info:
    // If address is a string, assume it's an address _id and fetch the full address
    let shippingAddress = address;
    if (typeof address === "string") {
      const addr = await Address.findById(address);
      if (!addr) {
        return res.status(404).json({ message: "Address not found" });
      }
      shippingAddress = {
        street: addr.street,
        city: addr.city,
        state: addr.state,
        postalCode: addr.postalCode,
      };
    }
    // If address is already an object, we assume it contains the required fields

    // For each product, create a separate order record with the same address
    const orders = [];
    for (const item of products) {
      // Each item should be in the format: { product: <productId>, quantity: <number> }
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
