require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
const cartRouter = require("./routes/cart.routes");
const addressRouter = require("./routes/address.routes");
const orderRouter = require("./routes/order.routes");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/addresses", addressRouter);
app.use("/orders", orderRouter);

app.get("/", (req, res) => {
    try {
        res.send("Server is running");
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({
        message: "Internal server error",
        error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
});

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    try {
        await connectDB();
        console.log("Server is running on Port:", PORT);
    } catch (error) {
        console.error("Server Startup Error:", error.message);
    }
});
