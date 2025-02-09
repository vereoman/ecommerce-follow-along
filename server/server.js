require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const userRouter = require('./routes/user.routes');
const productRouter = require('./routes/product.routes');
const cartRouter = require('./routes/cart.routes');
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express.json());

// Static folder for uploads
app.use('/uploads', express.static('uploads'));

// API routes with /api prefix
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);

// Health check route
app.get('/', (req, res) => {
    try {
        res.send('Server is running');
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    try {
        await connectDB();
        console.log('Server is running on Port:', PORT);
    } catch (error) {
        console.error('Server Startup Error:', error.message);
    }
});