require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const userRouter = require('./routes/user.routes');
const productRouter = require('./routes/product.routes');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', function (req, res) {
    try {
        res.send('hello');
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

app.use('/users', userRouter);
app.use('/items', productRouter);

app.listen(PORT, async function () {
    try {
        await connectDB();
        console.log('Server is running on Port:', PORT);
    } catch (error) {
        console.error('Server Startup Error:', error.message);
    }
});