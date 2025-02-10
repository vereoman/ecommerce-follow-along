const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    size: {
        type: String,
        required: true
    }
});

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        items: [cartItemSchema]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);
