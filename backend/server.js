const express = require('express');
const connectDB = require('./config/database');
const userRouter = require('./routes/user.routes');
require('dotenv').config();
const app = express();
const PORT = 6000;

app.use(express.json());

app.get('/', (req, res) => {
    try {
        res.send('Hello World');
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

app.use('/user', userRouter);

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Server startup error:', error);
        process.exit(1);
    }
};

startServer();