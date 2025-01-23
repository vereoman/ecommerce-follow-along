const express = require('express');
const connectDB = require('./config/database');
const userRouter = require('./routes/user.routes');
require('dotenv').config();
const app = express();
const PORT = 6000;

app.use(express.json());

app.get('/', function (req, res) {
    try {
        res.send('hello');
    } catch (error) {
        res.status(500).send('server error');
    }
});

app.use('/user', userRouter);

app.listen(PORT, async function () {
    try {
        await connectDB();
        console.log('server is running');
    } catch (error) {
        console.error('server startup error');
    }
});