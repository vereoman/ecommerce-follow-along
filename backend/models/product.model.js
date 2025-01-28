const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: validateUrl,
            message: props => `${props.value} is not a valid URL!`
        }
    },
}, {
    timestamps: true,
});

function validateUrl(url) {
    return /^(ftp|http|https):\/\/[^ "]+$/.test(url);
}

module.exports = mongoose.model('Product', productSchema);