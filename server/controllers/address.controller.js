const Address = require("../models/address.model");

const createAddress = async (req, res) => {
  try {
    const { street, city, state, postalCode } = req.body;
    if (!street || !city || !state || !postalCode) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newAddress = new Address({
      user: req.user._id,
      street,
      city,
      state,
      postalCode,
    });
    await newAddress.save();
    res.status(201).json(newAddress);
  } catch (error) {
    console.error("Error creating address:", error);
    res.status(500).json({
      message: "Error creating address",
      error: error.message,
    });
  }
};

const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user._id });
    res.json(addresses);
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({
      message: "Error fetching addresses",
      error: error.message,
    });
  }
};

module.exports = { createAddress, getAddresses };