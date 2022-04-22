const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const cartSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        refs: 'user32',
        required: true
    },
    items: [{
        productId: {
            type: ObjectId,
            refs: 'product32'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    totalItems: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('cart32', cartSchema);