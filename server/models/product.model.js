const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Product name is required'],
            trim: true,
            minlength: [2, 'Product name must be at least 2 characters long'],
            maxlength: [100, 'Product name cannot exceed 100 characters']
        },
        description: {
            type: String,
            required: [true, 'Product description is required'],
            trim: true,
            minlength: [10, 'Description must be at least 10 characters long'],
            maxlength: [1000, 'Description cannot exceed 1000 characters']
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price cannot be negative']
        },
        imageUrl: {
            type: String,
            required: [true, 'Product image is required']
        },
        cloudinaryId: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: [true, 'Product category is required'],
            enum: {
                values: [
                    'running', 'training', 'basketball', 'sneakers', 'slip-ons'
                ],
                message: '{VALUE} is not a supported category'
            }
        },
        gender: {
            type: String,
            required: [true, 'Gender is required'],
            enum: {
                values: ['mens', 'womens', 'kids', 'unisex'],
                message: '{VALUE} is not a supported gender'
            }
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { 
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

productSchema.index({ seller: 1, category: 1 });
productSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Product', productSchema);