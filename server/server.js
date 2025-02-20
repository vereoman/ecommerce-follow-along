require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const cors = require("cors");
const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
const cartRouter = require("./routes/cart.routes");
const addressRouter = require("./routes/address.routes");
const orderRouter = require("./routes/order.routes");
const paymentRouter = require("./routes/payment.routes");

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/addresses", addressRouter);
app.use("/orders", orderRouter);
app.use("/payments", paymentRouter);

app.use((req, res) => res.status(404).json({ message: "Route not found" }));

connectDB();

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;